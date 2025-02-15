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


    public function disable_woo_emails_if_virfice_enabled()
    {
        add_filter('woocommerce_locate_template', [$this, 'my_plugin_override_woocommerce_email_template'], 10, 3);
    }

    public function my_plugin_override_woocommerce_email_template($template, $template_name, $template_path)
    {
        // Ensure we're only modifying WooCommerce email templates
        if (strpos($template_name, 'emails/') === false) {
            return $template;
        }

        // Get the actual email ID from WooCommerce’s email registry
        $email_id = $this->get_email_id_from_template($template_name);

        if ($email_id && Utils::isVirficeTemplateEnabled($email_id)) {
            $custom_template_path = VIRFICE_PLUGIN_VIEWS_ROOT . "/woocommerce/$template_name";

            if (file_exists($custom_template_path)) {
                return $custom_template_path; // Use the custom Virfice template
            }
        }

        return $template; // Use the default WooCommerce template
    }

    /**
     * Retrieve WooCommerce email ID based on template name.
     */
    private function get_email_id_from_template($template_name)
    {
        $mailer = WC()->mailer();
        $emails = $mailer->get_emails();

        foreach ($emails as $email) {
            if ($email->template_html === $template_name) {
                return $email->id; // Return the correct WooCommerce email ID
            }
        }

        return null; // Return null if not found
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
