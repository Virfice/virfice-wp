<?php

namespace Virfice;

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

    public static function get_template_common_global_css()
    {
        return "
        <style>
        .virfice-template-wrapper *{
            margin: 0;
            padding: 0;
            border: 0;
            vertical-align: baseline;
            cursor: default;
        }
        body {
            margin: 0;
            padding: 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        td {
            text-align: center;
        }
        h2 {
            font-size: 20px;
            color: #333333;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
            color: #555555;
        }
        a{
            display: inline-block;
        }
        img {
            max-width: 100%;
            height: auto;
            display: block;
            border: 0;
        } </style>";
    }

    public static function virfice_wp_kses_allowed_html($html_string)
    {
        return wp_kses_post(html_entity_decode($html_string, ENT_COMPAT, 'UTF-8'));
    }

    public static function string_to_dom($str)
    {
        require_once VIRFICE_PLUGIN_ROOT . '/src/Includes/simple_html_dom.php';
        $dom = str_get_html($str);
        return $dom;
    }
    public static function dom_to_string($dom)
    {
        return $dom->save();
    }
}
