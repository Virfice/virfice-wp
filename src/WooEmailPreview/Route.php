<?php

namespace Virfice\WooEmailPreview;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Route
{
    public function __construct()
    {
        add_action('init', [$this, 'handle_email_preview_generation']);
    }

    // Handle preview button click
    public function handle_email_preview_generation()
    {
        if (!isset($_GET['email_id']) || !isset($_GET['woo_preview_nonce'])) {
            return;
        }

        if (!wp_verify_nonce($_GET['woo_preview_nonce'], 'email_id_' . $_GET['email_id'])) {
            return;
        }

		$email_id = sanitize_text_field($_REQUEST['email_id']); // Email obj id.
        $order_id = sanitize_text_field($_REQUEST['order_id']); // Comma-separated email addresses

        $wooEmailPreview = new WooEmailPreview($email_id, $_GET );

        // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        echo $wooEmailPreview->generate_preview(['order_id'=>$order_id]);
        exit;
    }

}