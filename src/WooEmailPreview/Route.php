<?php

namespace Virfice\WooEmailPreview;

// Security check to prevent direct access to the script
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Route
 * Handles the routing and initialization for email previews in the Virfice plugin.
 */
class Route
{

    /**
     * Route constructor.
     * Initializes WordPress hooks for handling email previews.
     */
    public function __construct()
    {
        add_action('init', [$this, 'handle_email_preview_generation']);
    }

    /**
     * Handles the generation of email previews when the preview button is clicked.
     *
     * @return void
     */
    public function handle_email_preview_generation()
    {
        if (!isset($_GET['email_id']) || !isset($_GET['woo_preview_nonce'])) {
            return;
        }

        if (!wp_verify_nonce(sanitize_text_field(wp_unslash($_GET['woo_preview_nonce'])), 'email_id_' . sanitize_text_field($_GET['email_id']))) {
            return;
        }

        $email_id = sanitize_text_field($_REQUEST['email_id']); // Email obj id.
        $order_id = sanitize_text_field($_REQUEST['order_id']); // Comma-separated email addresses

        //All get input sanitized
        $sanitize_get = $this->get_sanitize_get_for_woo_email_preview($_GET);

        $wooEmailPreview = new WooEmailPreview($email_id, $sanitize_get);
        // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        echo $wooEmailPreview->generate_preview(['order_id' => $order_id]);
        exit;
    }

    private function get_sanitize_get_for_woo_email_preview($get)
    {
        $sanitize_get = array();
        if (isset($get['enabled'])) {
            $sanitize_get['enabled'] = sanitize_text_field($get['enabled']);
        }
        if (isset($get['recipient'])) {
            $sanitize_get['recipient'] = sanitize_text_field($get['recipient']);
        }
        if (isset($get['subject'])) {
            $sanitize_get['subject'] = sanitize_text_field($get['subject']);
        }
        if (isset($get['heading'])) {
            $sanitize_get['heading'] = sanitize_text_field($get['heading']);
        }
        if (isset($get['additional_content'])) {
            $sanitize_get['additional_content'] = sanitize_text_field($get['additional_content']);
        }
        if (isset($get['email_type'])) {
            $sanitize_get['email_type'] = sanitize_text_field($get['email_type']);
        }
        if (isset($get['woocommerce_email_footer_text'])) {
            $sanitize_get['woocommerce_email_footer_text'] = sanitize_text_field($get['woocommerce_email_footer_text']);
        }
        if (isset($get['woocommerce_email_background_color'])) {
            $sanitize_get['woocommerce_email_background_color'] = sanitize_text_field($get['woocommerce_email_background_color']);
        }
        if (isset($get['woocommerce_email_body_background_color'])) {
            $sanitize_get['woocommerce_email_body_background_color'] = sanitize_text_field($get['woocommerce_email_body_background_color']);
        }
        if (isset($get['woocommerce_email_base_color'])) {
            $sanitize_get['woocommerce_email_base_color'] = sanitize_text_field($get['woocommerce_email_base_color']);
        }
        if (isset($get['woocommerce_email_text_color'])) {
            $sanitize_get['woocommerce_email_text_color'] = sanitize_text_field($get['woocommerce_email_text_color']);
        }
        if (isset($get['woocommerce_email_header_image'])) {
            $sanitize_get['woocommerce_email_header_image'] = sanitize_text_field($get['woocommerce_email_header_image']);
        }
        if (isset($get['virfice_show_social_icons'])) {
            $sanitize_get['virfice_show_social_icons'] = sanitize_text_field($get['virfice_show_social_icons']);
        } else {
            $sanitize_get['virfice_show_social_icons'] = get_option('virfice_show_social_icons');
        }
        if (isset($get['virfice_social_icons_heading'])) {
            $sanitize_get['virfice_social_icons_heading'] = sanitize_text_field($get['virfice_social_icons_heading']);
        } else {
            $sanitize_get['virfice_social_icons_heading'] = get_option('virfice_social_icons_heading', 'Follow us on');
        }

        return $sanitize_get;
    }
}
