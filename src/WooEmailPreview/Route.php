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