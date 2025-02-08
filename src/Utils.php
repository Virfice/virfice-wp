<?php

namespace Virfice;

use Exception;
use Virfice\API\Settings;
use Virfice\Includes\Logger;
use WC_Email;
// Security check to prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Utils
 * Contains utility functions for the Virfice plugin.
 */
class Utils
{
    /**
     * Retrieves the WooCommerce email object and its key from a given email ID.
     *
     * @param string $email_id The ID of the WooCommerce email template.
     *
     * @return array|null Returns an array with the email object and its key, or null if not found.
     */
    public static function get_email_object_from_email_id($email_id)
    {
        // Get the list of WooCommerce email objects
        $emails = WC()->mailer()->emails;

        // Loop through the emails to find the one with the matching ID
        foreach ($emails as $key => $email) {
            if ($email->id === $email_id) {
                return ['object' => $email, 'key' => $key];
            }
        }

        return null; // Return null if no matching email is found
    }

    public static function isVirficeTemplateEnabled($email_id)
    {
        return Utils::get_boolean_value(MetaHelper::get_meta(0, 'woo-email', $email_id . '_virfice_template_status', false));
    }

    /**
     * Gets the current admin URL based on the request URI.
     *
     * @return string The current admin URL.
     */
    public static function get_current_admin_url()
    {
        // Sanitize the current request URI
        $request_uri = isset($_SERVER['REQUEST_URI']) ? sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])) : '';

        // Returns the admin URL for the sanitized request URI
        return admin_url(basename($request_uri));
    }

    /**
     * Checks whether WooCommerce is activated.
     *
     * @return bool True if WooCommerce is activated; otherwise, false.
     */
    public static function is_woocommerce_activated()
    {
        // Get the list of active plugins
        $active_plugins = apply_filters('active_plugins', get_option('active_plugins'));

        // Check if WooCommerce is among the active plugins
        return in_array('woocommerce/woocommerce.php', $active_plugins);
    }

    /**
     * Sanitizes each element in an array based on its type.
     *
     * - Strings are sanitized using sanitize_text_field.
     * - Integers are cast to int.
     * - Floats are cast to float.
     * - Nested arrays are recursively sanitized.
     * - All other types are sanitized as strings using sanitize_text_field.
     *
     * @param array $data The array to be sanitized.
     *
     * @return array The sanitized array.
     */
    public static function sanitize_array($data)
    {
        if (is_array($data)) {
            $data = array_map(function ($value) {
                if (is_string($value)) {
                    return sanitize_text_field($value);
                } elseif (is_int($value)) {
                    return intval($value);
                } elseif (is_float($value)) {
                    return floatval($value);
                } elseif (is_array($value)) {
                    return array_map(function ($item) {
                        return is_string($item) ? sanitize_text_field($item) : $item;
                    }, $value);
                } else {
                    return sanitize_text_field($value); // Fallback for other types
                }
            }, $data);
        }

        return $data;
    }

    /**
     * Retrieves the plugin's home URL.
     * 
     */
    public static function get_plugin_home_url()
    {
        return admin_url('admin.php?page=' . VIRFICE_APP_PREFIX);
    }

    /**
     * Retrieves the WooCommerce brand settings.
     *
     * @return array Brand settings for WooCommerce email templates.
     */
    public static function get_brand_settings()
    {
        // Define an array to store email settings
        $email_settings = array();
        $email_settings['woocommerce_email_from_name'] = get_option('woocommerce_email_from_name');
        $email_settings['woocommerce_email_from_address'] = get_option('woocommerce_email_from_address');
        $email_settings['woocommerce_email_header_image'] = get_option('woocommerce_email_header_image');
        $email_settings['woocommerce_email_footer_text'] = get_option('woocommerce_email_footer_text');
        $email_settings['woocommerce_email_base_color'] = get_option('woocommerce_email_base_color');
        $email_settings['woocommerce_email_background_color'] = get_option('woocommerce_email_background_color');
        $email_settings['woocommerce_email_body_background_color'] = get_option('woocommerce_email_body_background_color');
        $email_settings['woocommerce_email_text_color'] = get_option('woocommerce_email_text_color');
        $email_settings['woocommerce_merchant_email_notifications'] = get_option('woocommerce_merchant_email_notifications');
        $email_settings['virfice_show_social_icons'] = get_option('virfice_show_social_icons');
        $email_settings['virfice_social_icons_heading'] = get_option('virfice_social_icons_heading', 'Follow us on');

        return $email_settings;
    }

    /**
     * Retrieves the WooCommerce brand settings.
     *
     * @return array Brand settings for WooCommerce email templates.
     */
    public static function get_virfice_brand_settings()
    {
        // Define an array to store email settings
        $email_settings = array();

        $brand_settings = self::get_brand_settings();
        $settings = Settings::get_email_settings();

        $email_settings['template_id'] = MetaHelper::get_meta(0, 'brand-settings', 'template_id', false);

        $email_settings['email_body_width'] = MetaHelper::get_meta(0, 'brand-settings', 'email_body_width', 600);
        $email_settings['logo'] = MetaHelper::get_meta(0, 'brand-settings', 'logo', $brand_settings['woocommerce_email_header_image']);
        $email_settings['store_name'] = MetaHelper::get_meta(0, 'brand-settings', 'store_name', $settings['virfice_store_name']);

        $email_settings['email_background_color'] = MetaHelper::get_meta(0, 'brand-settings', 'email_background_color', $brand_settings['woocommerce_email_body_background_color']);

        $email_settings['email_outer_background_color'] = MetaHelper::get_meta(0, 'brand-settings', 'email_outer_background_color', $brand_settings['woocommerce_email_background_color']);

        $email_settings['email_body_text'] = MetaHelper::get_meta(0, 'brand-settings', 'email_body_text', $brand_settings['woocommerce_email_text_color']);

        $email_settings['email_body_button_bg'] = MetaHelper::get_meta(0, 'brand-settings', 'email_body_button_bg', $brand_settings['woocommerce_email_base_color']);
        $email_settings['email_body_button_color'] = MetaHelper::get_meta(0, 'brand-settings', 'email_body_button_color', $brand_settings['woocommerce_email_text_color']);

        $email_settings['email_link_color'] = MetaHelper::get_meta(0, 'brand-settings', 'email_link_color', $brand_settings['woocommerce_email_base_color']);

        $email_settings['header_text_color'] = MetaHelper::get_meta(0, 'brand-settings', 'header_text_color', $brand_settings['woocommerce_email_text_color']);
        $email_settings['header_icons_color'] = MetaHelper::get_meta(0, 'brand-settings', 'header_icons_color', $brand_settings['woocommerce_email_text_color']);
        $email_settings['header_background_color'] = MetaHelper::get_meta(0, 'brand-settings', 'header_background_color', $brand_settings['woocommerce_email_base_color']);


        $email_settings['footer_text_color'] = MetaHelper::get_meta(0, 'brand-settings', 'footer_text_color', $brand_settings['woocommerce_email_text_color']);
        $email_settings['footer_icons_color'] = MetaHelper::get_meta(0, 'brand-settings', 'footer_icons_color', $brand_settings['woocommerce_email_text_color']);
        $email_settings['footer_link_color'] = MetaHelper::get_meta(0, 'brand-settings', 'footer_link_color', $brand_settings['woocommerce_email_base_color']);
        $email_settings['footer_background_color'] = MetaHelper::get_meta(0, 'brand-settings', 'footer_background_color', $brand_settings['woocommerce_email_base_color']);

        return $email_settings;
    }

    /**
     * Retrieves the HTML for social icons.
     *
     * @return string The HTML content for social icons.
     */
    public static function get_social_icons_html($title)
    {
        // This is a placeholder function. Replace with actual logic to retrieve social icons HTML.
        ob_start();
        include(VIRFICE_PLUGIN_VIEWS_ROOT . '/emails/social-icons.php');
        $social_icons_html = ob_get_clean();
        return $social_icons_html;
    }

    /**
     * Retrieves the HTML for store address.
     *
     * @return string The HTML content for store address.
     */
    public static function get_store_address_html()
    {
        // This is a placeholder function. Replace with actual logic to retrieve social icons HTML.
        ob_start();
        include(VIRFICE_PLUGIN_VIEWS_ROOT . '/emails/store-address.php');
        $social_icons_html = ob_get_clean();
        return $social_icons_html;
    }

    /**
     * Get boolean value
     */
    public static function get_boolean_value($value)
    {
        return filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }

    //TODO: no one used this method. please check.
    public static function get_template_common_global_css()
    {

        $global_settings = self::get_virfice_brand_settings();
        $email_outer_background_color = $global_settings['email_outer_background_color'];
        $email_background_color = $global_settings['email_background_color'];
        $email_body_width = $global_settings['email_body_width'];
        $email_body_text = $global_settings['email_body_text'];

        $email_body_button_bg = $global_settings['email_body_button_bg'];
        $email_body_button_color = $global_settings['email_body_button_color'];
        $email_link_color = $global_settings['email_link_color'];
        $header_text_color = $global_settings['header_text_color'];
        $header_icons_color = $global_settings['header_icons_color'];
        $header_background_color = $global_settings['header_background_color'];
        $footer_text_color = $global_settings['footer_text_color'];
        $footer_icons_color = $global_settings['footer_icons_color'];
        $footer_link_color = $global_settings['footer_link_color'];
        $footer_background_color = $global_settings['footer_background_color'];
        return "
       <style>
        .virfice-editor-wrapper {
            margin: 0;
            padding: 0;
            background-color: $email_outer_background_color;
            color: $email_body_text;
        }
        .virfice-template-wrapper{
            width: " . $email_body_width . "px;
            max-width: 100%;
            margin: auto;
            background-color: $email_background_color;
        }
        .virfice-template-wrapper table {
            width: 100%;
            border-collapse: collapse;
        }
       .virfice-template-wrapper h2 {
            font-size: 20px;
            color: inherit;
        }
        .virfice-template-wrapper p {
            font-size: 16px;
            line-height: 1.5;
        }
        .virfice-template-wrapper a{
            display: inline-block;
            color: $email_body_button_color;
            background-color: $email_body_button_bg;
        }
        .virfice-template-wrapper img {
            max-width: 100%;
            height: auto;
            display: block;
            border: 0;
        }
        .virfice-template-wrapper .virfice-email-header{
            color: $header_text_color;
            background-color: $header_background_color;
        }
        .virfice-template-wrapper .virfice-email-footer{
            color: $footer_text_color;
            background-color: $footer_background_color;
        }
        </style>";
    }

    public static function virfice_wp_kses_allowed_html($html_string)
    {
        return $html_string;
        return wp_kses_post(html_entity_decode($html_string, ENT_COMPAT, 'UTF-8'));
    }

    public static function get_template_content_from_woo_email_id($email_id)
    {
        $_virfice_template_id = MetaHelper::get_meta(0, 'woo-email', $email_id . '_virfice_template_id', false);
        $template = get_post($_virfice_template_id);
        return $template->post_content;
    }

    public static function wrap_template_with_html_tag($template)
    {
        // Ensure the template is stripped of unnecessary slashes
        $template = stripslashes($template);
        $common_css = self::get_template_common_global_css();
        // Wrap the template in standard HTML structure
        $html_template = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    $common_css
</head>
<body class="virfice-editor-wrapper">
    <div class="virfice-template-wrapper">
        $template
    </div>
</body>
</html>
HTML;
        try {
            // Check if the class WC_Email exists
            if (!class_exists('WC_Email')) {
                // Include the file containing the WC_Email class
                include_once WP_PLUGIN_DIR . '/woocommerce/includes/emails/class-wc-email.php';
            }
            // Create an instance of WC_Email
            $email = new WC_Email();

            // Apply custom CSS to the email template
            $html_template = $email->style_inline($html_template);
        } catch (\Throwable $th) {
            // Handle exceptions gracefully
        }
        return $html_template;
    }


    public static function LOG($message)
    {
        // Initialize the logger with a custom log file (optional)
        $logger = new Logger('___LOG.txt');

        // Write an error to the log
        try {
            $logger->logError($message);
        } catch (Exception $e) {
            echo "Failed to write to log file: " . $e->getMessage();
        }
    }

    public static function get_woo_email_preview_text($email_id)
    {
        $meta_name = 'woocommerce_' . $email_id . '_settings';
        $settings = get_option($meta_name);
        if (isset($settings['virfice_preview_text'])) {
            return "<span style='font-size: 0; color: #fff; max-height: 0; max-width: 0; opacity: 0; overflow: hidden;height:0;width:1px;'>" . $settings['virfice_preview_text'] . "</span>";
        }
        return '';
    }
}
