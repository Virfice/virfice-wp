<?php

namespace Virfice;

// Security check to prevent direct access to the script
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class WooEmailHooks
 * Adds a custom "Preview" button to WooCommerce email settings and handles script enqueuing.
 */
class WooEmailHooks
{
    /**
     * WooEmailHooks constructor.
     * Registers the necessary WordPress hooks for adding preview buttons and script enqueuing.
     */
    public function __construct()
    {
        add_filter('woocommerce_email_footer_text', array($this, 'replace_woo_email_footer_text'));
    }


    public function replace_woo_email_footer_text($string)
    {
        if (isset($_GET['woo_preview_nonce']) || isset($_POST['changedSettings'])) {
            return $string;
        }
        $brand_settings = Utils::get_brand_settings();
        // Check if social icons should be included
        if (isset($brand_settings['virfice_show_social_icons']) && ($brand_settings['virfice_show_social_icons'] == 1 || $brand_settings['virfice_show_social_icons'] === 'true')) {
            // Include social icons HTML (ensure this path is correct and sanitized if dynamic)
            $title = $brand_settings['virfice_social_icons_heading'];
            $social_icons_html = Utils::get_social_icons_html($title);
            $string .= $social_icons_html;
        }
        $string .= Utils::get_store_address_html();
        return $string;
    }
}
