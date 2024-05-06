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
        // Returns the admin URL for the current request URI
        return admin_url(basename($_SERVER['REQUEST_URI']));
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
}