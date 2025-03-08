<?php

namespace Virfice\API;

use simplehtmldom\HtmlWeb;
use simplehtmldom\HtmlDocument;
use Virfice\Utils;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

use WP_REST_Controller;
use WP_REST_Server;

/**
 * Class VirficeTestEmailSend
 * Manages REST API endpoints for WooCommerce email customization in the Virfice plugin.
 */
class VirficeTestEmailSend extends WP_REST_Controller
{
	/**
	 * VirficeTestEmailSend constructor.
	 * Initializes REST API namespace and base route.
	 */
	public function __construct()
	{
		$this->namespace = VIRFICE_APP_PREFIX . '/v1';
		$this->rest_base = 'virfice-test-email-send';
	}

	/**
	 * Registers custom REST API routes for WooCommerce email-related functionality.
	 *
	 * @return void
	 */
	public function register_routes()
	{
		// Register a REST API endpoint to send a test email
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/send-test-email',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array($this, 'send_test_email'),
					'permission_callback' => array($this, 'get_item_permissions_check'),
					'args'                => $this->get_endpoint_args_for_item_schema(WP_REST_Server::READABLE),
				),
				'schema' => array($this, 'get_item_schema'),
			)
		);
	}



	/**
	 * Sends a test email based on a specific WooCommerce email template.
	 *
	 * @return bool True if the test email was successfully sent.
	 */
	public function send_test_email()
	{
		// Sanitize the email and preview URL inputs
		// verified in get_item_permissions_check method
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$emails = sanitize_text_field($_REQUEST['emails']); // Comma-separated email addresses
		$type = sanitize_text_field($_REQUEST['type']); // Comma-separated email addresses
		$template = Utils::virfice_wp_kses_allowed_html($_REQUEST['template']); // Comma-separated email addresses

		if ($type === 'woo_test_email') {
			$email_id = sanitize_text_field($_REQUEST['email_id']); // Comma-separated email addresses
			return $this->process_and_send_woo_test_email($email_id, $template, $emails);
		} else if ($type === 'test_email') {
			//else send test email
			$template = Utils::wrap_template_with_html_tag($template);
			$headers      = "Content-Type: text/html\r\n";
			$headers = Utils::add_reply_to_headers($headers);

			wp_mail($emails, '[Test] - Brand Settings', $template, $headers);
		}

		return $_REQUEST;
	}

	private function process_and_send_woo_test_email($email_id, $template, $emails)
	{
		//woo send test email
		$email_obj = Utils::get_email_object_from_email_id($email_id);
		$email_obj = $email_obj['object'];
		$subject = $email_obj->get_option('subject', $email_obj->subject);
		$subject = apply_filters('woocommerce_email_subject_' . $email_id, $subject, $email_obj);

		$subject = "[Test] - $subject";

		// Clean up slashes in the template
		$template = Utils::wrap_template_with_html_tag($template);

		//TODO: need to implement shortcode manager class for $type: woo_test_email. And applicable for $template, $subject; 

		$headers      = "Content-Type: text/html\r\n";
		// $sendMail     = \WC_Emails::instance();
		if (! empty($emails)) {
			$sendMailSucc = $email_obj->send($emails, $subject, $template, $headers, array());

			// wp_mail($emails, $subject, $template, $headers);

			return $sendMailSucc;
		}

		return false;
	}

	/**
	 * Checks if a given request has permission to access the endpoint.
	 *
	 * @param \WP_REST_Request $request The REST API request.
	 *
	 * @return bool|\WP_REST_Response True if the request has permissions; otherwise, a WP_REST_Response with an error.
	 */
	public function get_item_permissions_check($request)
	{
		// Retrieve the nonce from the request headers
		$nonce = $request->get_header('X-WP-Nonce');

		// Verify the nonce to ensure security
		if (!wp_verify_nonce($nonce, 'wp_rest')) {
			return new WP_Error(
				'invalid_nonce',
				'Invalid nonce provided.',
				array('status' => 403)
			); // Return an error if the nonce is invalid
		}

		// Check if the current user has the necessary capability
		return current_user_can('manage_woocommerce');
	}
}
