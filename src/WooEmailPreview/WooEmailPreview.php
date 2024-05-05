<?php

namespace Virfice\WooEmailPreview;

// use Virfice\API\WooOrder;

use Virfice\API\WooOrder;
use Virfice\Utils;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class WooEmailPreview
{

    private $settings = array();
    private $email_id = false;
    private $send_test_email = false;
    private $test_emails = ''; //comma seperated string

    private $brand_option_filters = array(
        'woocommerce_email_background_color',
        'woocommerce_email_body_background_color',
        'woocommerce_email_base_color',
        'woocommerce_email_text_color',
        'woocommerce_email_header_image'
    );

    public function __construct($email_id = false, $settings = [])
    {
        $this->settings = $settings;
        $this->email_id = $email_id;
        $this->settings['email_id'] = $email_id;

        $this->add_option_filters();
        add_filter('woocommerce_email_footer_text', array($this, 'replace_placeholders'));
    }

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

    public function replace_placeholders($string)
    {
        return  !empty($this->settings['woocommerce_email_footer_text']) ? sanitize_text_field($this->settings['woocommerce_email_footer_text']) : $string;
    }


    public function get_wc_order_id($options)
    {
        if (!empty($options['order_id'])) return $options['order_id'];
        $woo_orders = new WooOrder();
        $orders = $woo_orders->get_all_orders();
        if (count($orders) > 0) {
            return $orders[0]['id'];
        }
        return 25;
    }

    public function generate_preview($options = [])
    {
        if (isset($options['send_test_email'])) {
            $this->send_test_email = sanitize_text_field($options['send_test_email']);
        }
        if (isset($options['emails'])) {
            $this->test_emails = sanitize_text_field($options['emails']);
        }

        $email = Utils::get_email_object_from_email_id($this->email_id);

        if (!$email) {
            return "Email template not found!";
        }
        $email_obj = $email['object'];
        $email_key = $email['key'];

        $index = $email_key;
        $order_id = $this->get_wc_order_id($options);

        if (!$order_id) {
            return "Order not found!";
        }
        //needs to be called to get shipping and payment gateways data
        WC()->payment_gateways();
        WC()->shipping();


        add_filter('woocommerce_email_recipient_' . $email_obj->id, [$this, 'no_recipient']);
        if ($this->send_test_email) {
            add_filter('woocommerce_new_order_email_allows_resend', '__return_true');
        }


        if ($index === 'WC_Email_Customer_Note') {
            /* customer note needs to be added*/
            $customer_note = 'This is customer note. Virfice test demo note.';
            $args          = array(
                'order_id'      => $order_id,
                'customer_note' => $customer_note,
            );
            $email_obj->trigger($args);
        } else {
            $email_obj->trigger($order_id);
        }
        //set the type of email:
        // $email_obj->email_type = $email_type;
        $content                   = $email_obj->get_content();
        $content                   = apply_filters('woocommerce_mail_content', $email_obj->style_inline($content));

        ob_start();
?>
        <!DOCTYPE html>
        <html lang="<?php echo esc_attr(get_locale()); ?>">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>

        <body>
            <?php
            //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            echo $content;
            ?>
        </body>

        </html>
<?php
        return ob_get_clean();
    }

    public function no_recipient($recipient): string
    {
        return $this->test_emails;
    }
}
?>