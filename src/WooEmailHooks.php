<?php

namespace Virfice;

use Virfice\Includes\WooEmailToVirficeEmail;

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
        add_action('init', [$this, 'disable_woo_emails_if_virfice_enabled']);

        add_filter('woocommerce_email_footer_text', array($this, 'replace_woo_email_footer_text'));
    }


    public function my_plugin_override_woocommerce_email_template($template, $template_name, $template_path)
    {
        $plugin_path = VIRFICE_PLUGIN_VIEWS_ROOT . "/woocommerce/$template_name";
        // Return the custom template if it exists
        if (file_exists($plugin_path)) {
            return $plugin_path;
        }
        // Return the default template if no custom template found
        return $template;
    }

    public function disable_woo_emails_if_virfice_enabled()
    {
        // Get all email lists using WooCommerce's email functionality
        $email_lists = WC()->mailer()->get_emails();

        foreach ($email_lists as $email_key => $email_obj) {
            $email_id = $email_obj->id;
            $virfice_template_status = Utils::isVirficeTemplateEnabled($email_id);

            if ($virfice_template_status) {
                add_filter('woocommerce_locate_template', [$this, 'my_plugin_override_woocommerce_email_template'], 10, 3);
            }
        }
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
