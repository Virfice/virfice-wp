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
        // Get all email lists using WooCommerce's email functionality
        $email_lists = WC()->mailer()->get_emails();

        foreach ($email_lists as $email_key => $email_obj) {
            $email_id = $email_obj->id;
            $virfice_template_status = Utils::isVirficeTemplateEnabled($email_id);
            if ($virfice_template_status) {
                // Disable WooCommerce New Order Email
                add_filter("woocommerce_email_enabled_$email_id", '__return_false');

                // Hook custom email sending function for specific email types
                switch ($email_id) {
                    case 'new_order':
                        add_action("woocommerce_$email_id", [$this, 'send_custom_new_order_email'], 10, 1);
                        break;
                    case 'customer_processing_order':
                        add_action("woocommerce_$email_id", [$this, 'send_custom_customer_processing_order_email'], 10, 1);
                        break;
                    default:
                        break;
                }
            }
        }
    }


    public function send_custom_customer_processing_order_email($order_id)
    {
        if (!$order_id) {
            return;
        }
        $email_id = 'customer_processing_order';

        $email_obj = Utils::get_email_object_from_email_id($email_id);
        $email_obj = $email_obj['object'];

        $email_obj->trigger($order_id);

        $emails = $email_obj->get_recipient();
        $subject = $email_obj->get_subject();
        $headers      = $email_obj->get_headers();
        $attachments      = $email_obj->get_attachments();

        $template = Utils::get_template_content_from_woo_email_id($email_id);
        //TODO: need to implement shortcode manager class for $type: woo_test_email. And applicable for $template, $subject; 

        // $sendMail     = \WC_Emails::instance();
        if (! empty($emails)) {
            $email_obj->send($emails, $subject, $template, $headers, $attachments);
        }
    }


    public function send_custom_new_order_email($order_id)
    {
        if (!$order_id) {
            return;
        }
        $email_id = 'new_order';

        $email_obj = Utils::get_email_object_from_email_id($email_id);
        $email_obj = $email_obj['object'];

        $email_obj->trigger($order_id);

        $emails = $email_obj->get_recipient();
        $subject = $email_obj->get_subject();
        $headers      = $email_obj->get_headers();
        $attachments      = $email_obj->get_attachments();

        $template = Utils::get_template_content_from_woo_email_id($email_id);
        //TODO: need to implement shortcode manager class for $type: woo_test_email. And applicable for $template, $subject; 

        // $sendMail     = \WC_Emails::instance();
        if (! empty($emails)) {
            $email_obj->send($emails, $subject, $template, $headers, $attachments);
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
