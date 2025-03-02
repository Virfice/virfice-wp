<?php

namespace Virfice\WooEmailPreview;

// Security check to prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

use DOMDocument;
use DOMXPath;
use Virfice\API\Settings;
use Virfice\API\WooOrder;
use Virfice\Utils;

/**
 * Class WooEmailPreview
 * Handles the preview generation for WooCommerce email templates in the Virfice plugin.
 */
class WooEmailPreview
{

    /**
     * @var array Email template settings.
     */
    private $settings = array();

    /**
     * @var string|bool The ID of the email template to preview.
     */
    private $email_id = false;

    /**
     * @var bool Whether to send a test email.
     */
    private $send_test_email = false;

    /**
     * @var string Comma-separated string of test email recipients.
     */
    private $test_emails = '';

    /**
     * @var array List of WooCommerce brand option filters.
     */
    private $brand_option_filters = array(
        'woocommerce_email_background_color',
        'woocommerce_email_body_background_color',
        'woocommerce_email_base_color',
        'woocommerce_email_text_color',
        'woocommerce_email_header_image',
    );

    /**
     * WooEmailPreview constructor.
     * Sets up the email preview settings and adds necessary option filters.
     *
     * @param string|bool $email_id The ID of the email template to preview.
     * @param array       $settings Custom settings for the email template.
     */
    public function __construct($email_id = false, $settings = [])
    {
        $this->settings = $settings;
        $this->email_id = $email_id;
        $this->settings['email_id'] = $email_id;

        $this->add_option_filters();
        add_filter('woocommerce_email_footer_text', array($this, 'replace_placeholders'));
    }

    /**
     * Adds custom option filters for WooCommerce email templates.
     * These filters modify WooCommerce brand options based on custom settings.
     *
     * @return void
     */
    private function add_option_filters()
    {
        //single email related option value filters
        //TODO: need to check realtime send test email
        if (!empty($this->settings['email_id'])) {
            $meta_name = 'woocommerce_' . $this->settings['email_id'] . '_settings';
            add_filter('option_' . $meta_name, function ($value) {
                return array(
                    'enabled' => isset($this->settings['enabled']) ? $this->settings['enabled'] : '',
                    'recipient' => isset($this->settings['recipient']) ? $this->settings['recipient'] : '',
                    'subject' => isset($this->settings['subject']) ? $this->settings['subject'] : '',
                    'heading' => isset($this->settings['heading']) ? $this->settings['heading'] : '',
                    'additional_content' => isset($this->settings['additional_content']) ? $this->settings['additional_content'] : '',
                    'email_type' => isset($this->settings['email_type']) ? $this->settings['email_type'] : 'html',
                );
            });
        }


        foreach ($this->brand_option_filters as $key => $filter) {
            add_filter('option_' . $filter, function ($value) use ($filter) {
                return  isset($this->settings[$filter]) ? sanitize_text_field($this->settings[$filter]) : $value;
            });
        }
    }

    /**
     * Replaces placeholders in the WooCommerce email footer text.
     *
     * @param string $string The original email footer text.
     *
     * @return string The modified email footer text.
     */
    public function replace_placeholders($string)
    {
        $string =  !empty($this->settings['woocommerce_email_footer_text']) ? sanitize_text_field($this->settings['woocommerce_email_footer_text']) : $string;

        // Check if social icons should be included
        if (isset($this->settings['virfice_show_social_icons']) && ($this->settings['virfice_show_social_icons'] == 1 || $this->settings['virfice_show_social_icons'] === 'true')) {
            // Include social icons HTML (ensure this path is correct and sanitized if dynamic)
            $title = $this->settings['virfice_social_icons_heading'];
            $social_icons_html = Utils::get_social_icons_html($title);
            $string .= $social_icons_html;
        }
        $string .= Utils::get_store_address_html();
        return $string;
    }


    /**
     * Gets a WooCommerce order ID for the preview.
     *
     * @param array $options Additional options for retrieving the order ID.
     *
     * @return int The WooCommerce order ID.
     */
    public function get_wc_order_id($options)
    {
        if (!empty($options['order_id'])) return $options['order_id'];
        $woo_orders = new WooOrder();
        $orders = $woo_orders->get_all_orders();
        if (count($orders) > 0) {
            return $orders[0]['id'];
        }
        return '';
    }

    /**
     * Generates a preview of a WooCommerce email template.
     * Optionally sends a test email to specified recipients.
     *
     * @param array $options Additional options for generating the preview.
     *
     * @return string The generated email preview content.
     */
    public function generate_preview($options = [])
    {
        // Determine if a test email should be sent
        if (isset($options['send_test_email'])) {
            $this->send_test_email = (bool)sanitize_text_field($options['send_test_email']);
        }

        // Set the test email recipients if provided
        if (isset($options['emails'])) {
            $this->test_emails = sanitize_text_field($options['emails']);
        }

        // Get the email object based on the email ID
        $email = Utils::get_email_object_from_email_id($this->email_id);

        if (!$email) {
            return "Email template not found!"; // Return an error message if the email template is not found
        }

        // Get the WooCommerce email object and key
        $email_obj = $email['object'];
        $email_key = $email['key'];

        // Get a valid WooCommerce order ID for the email preview
        $order_id = $this->get_wc_order_id($options);

        if (!$order_id) {
            return "Order not found!"; // Return an error message if no order is found
        }

        // Ensure WooCommerce payment gateways and shipping methods are loaded
        WC()->payment_gateways();
        WC()->shipping();

        // Modify email recipient if sending a test email
        add_filter('woocommerce_email_recipient_' . $email_obj->id, [$this, 'no_recipient']);

        if ($this->send_test_email) {
            // Enable resending of new order emails
            add_filter('woocommerce_new_order_email_allows_resend', '__return_true');
        }

        // Trigger the email based on its key and order ID
        if ($email_key === 'WC_Email_Customer_Note') {
            // Handle customer note email separately
            $customer_note = 'This is a customer note. Virfice test demo note.'; //TODO: //need to change customer note
            $args = array(
                'order_id' => $order_id,
                'customer_note' => $customer_note,
            );
            $email_obj->trigger($args);
        } else {
            $email_obj->trigger($order_id);
        }

        // Get the styled email content
        $content = $email_obj->get_content();
        $content = apply_filters('woocommerce_mail_content', $email_obj->style_inline($content));

        //TODO:we need to check in future.
        $style_and_html = $this->extract_styles($content);

        // Output the email preview as an HTML document
        ob_start(); // Start output buffering
?>
        <!DOCTYPE html>
        <html lang="<?php echo esc_attr(get_locale()); ?>">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <?php echo wp_kses('<style>' . $style_and_html['styles'] . '</style>', array('style' => array())); ?>
        </head>

        <body>
            <?php
            //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            echo wp_kses_post($style_and_html['html']);
            // echo $content;
            ?>
        </body>

        </html>
<?php
        return ob_get_clean(); // Return the buffered HTML content
    }

    /**
     * Replaces email recipients with the test email addresses.
     *
     * @param string $recipient The original recipient.
     *
     * @return string The modified recipient with test email addresses.
     */
    public function no_recipient($recipient)
    {
        return $this->test_emails; // Return the test email addresses
    }

    private function extract_styles($html)
    {
        $doc = new DOMDocument();
        // Suppress errors due to invalid HTML, if any
        @$doc->loadHTML($html);

        $styles = '';
        $xpath = new DOMXPath($doc);

        // Get all style tags
        foreach ($xpath->query('//style') as $style) {
            $styles .= $doc->saveHTML($style);
            $style->parentNode->removeChild($style); // Remove the style tag from the original HTML
        }

        // Save the remaining HTML
        $html = $doc->saveHTML();

        return array('styles' => $styles, 'html' => $html);
    }
}
?>