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
    public static function sanitize_array($data){
        if (is_array($data)) {
            $data = array_map(function($value) {
                if (is_string($value)) {
                    return sanitize_text_field($value);
                } elseif (is_int($value)) {
                    return intval($value);
                } elseif (is_float($value)) {
                    return floatval($value);
                } elseif (is_array($value)) {
                    return array_map(function($item) {
                        return is_string($item) ? sanitize_text_field($item) : $item;
                    }, $value);
                } else {
                    return sanitize_text_field($value); // Fallback for other types
                }
            }, $data);
        }

        return $data;
    }

    public static function get_plugin_home_url() {
        return admin_url('admin.php?page=' . VIRFICE_APP_PREFIX);
    }
}