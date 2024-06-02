<?php

namespace Virfice\API;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

use Virfice\Utils;
use Virfice\WooEmailPreview\WooEmailPreview;
use WP_Error;
use WP_REST_Controller;
use WP_REST_Server;

/**
 * Class WooEmail
 * Manages REST API endpoints for WooCommerce email customization in the Virfice plugin.
 */
class WooEmail extends WP_REST_Controller
{
	/**
     * WooEmail constructor.
     * Initializes REST API namespace and base route.
     */
	public function __construct()
	{
		$this->namespace = VIRFICE_APP_PREFIX . '/v1';
		$this->rest_base = 'woo-email';
	}

	/**
     * Registers custom REST API routes for WooCommerce email-related functionality.
     *
     * @return void
     */
	public function register_routes()
	{
		// Register a REST API endpoint to get all email settings
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/all',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array($this, 'get_all_emails'),
					'permission_callback' => array($this, 'get_item_permissions_check'),
					'args'                => $this->get_endpoint_args_for_item_schema(WP_REST_Server::READABLE),
				),
				'schema' => array($this, 'get_item_schema'),
			)
		);
		
		// Register a REST API endpoint to get a single email's settings
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/single',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array($this, 'get_single_email'),
					'permission_callback' => array($this, 'get_item_permissions_check'),
					'args'                => $this->get_endpoint_args_for_item_schema(WP_REST_Server::READABLE),
				),
				'schema' => array($this, 'get_item_schema'),
			)
		);

		// Register a REST API endpoint to get WooCommerce brand settings
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/brand-settings',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array($this, 'get_brand_settings'),
					'permission_callback' => array($this, 'get_item_permissions_check'),
					'args'                => $this->get_endpoint_args_for_item_schema(WP_REST_Server::READABLE),
				),
				'schema' => array($this, 'get_item_schema'),
			)
		);

		// Register a REST API endpoint to update WooCommerce brand settings
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/brand-settings',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array($this, 'save_brand_settings'),
					'permission_callback' => array($this, 'get_item_permissions_check'),
					'args'                => $this->get_endpoint_args_for_item_schema(WP_REST_Server::READABLE),
				),
				'schema' => array($this, 'get_item_schema'),
			)
		);
		
		// Register a REST API endpoint to save email settings
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/save-email-settings',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array($this, 'save_email_settings'),
					'permission_callback' => array($this, 'get_item_permissions_check'),
					'args'                => $this->get_endpoint_args_for_item_schema(WP_REST_Server::READABLE),
				),
				'schema' => array($this, 'get_item_schema'),
			)
		);
		
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
     * Retrieves a list of all WooCommerce email templates.
     *
     * @return array List of email templates with metadata.
     */
	public function get_all_emails()
	{
		// Get all email lists using WooCommerce's email functionality
		$email_lists = WC()->mailer()->get_emails();

		// Extract email list data
		$formatted_email_lists = array();
		foreach ($email_lists as $email_key => $email_obj) {

			$url = add_query_arg(array(
				'email_id' => $email_obj->id,
				'woo_preview_nonce' => wp_create_nonce('email_id_' . $email_obj->id),
			), home_url('/'));

			// echo "<pre>";var_dump($email_obj);die;

			$formatted_email_lists[] = array(
				'id' => $email_obj->id,
				'key' => $email_key,
				'title' => $email_obj->get_title(),
				'email_type' => $email_obj->get_email_type(),
				'recipient' => $email_obj->get_recipient(),
				'previewUrl' => $url
				// You can add more data as needed
			);
		}

		return $formatted_email_lists;
	}
	
	/**
     * Retrieves the settings for a specific WooCommerce email.
     *
     * @return array Metadata for the email.
     */
	public function get_single_email()
	{
		//verified in get_item_permissions_check method
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$email_id = sanitize_text_field($_REQUEST['email_id']); // Email obj id.
		$email = Utils::get_email_object_from_email_id($email_id);

		$url = add_query_arg(array(
			'email_id' => $email_id,
			'woo_preview_nonce' => wp_create_nonce('email_id_' . $email_id),
		), home_url('/'));

		$email['previewUrl'] = $url;
		return $email;
	}

	/**
     * Retrieves the WooCommerce brand settings.
     *
     * @return array Brand settings for WooCommerce email templates.
     */
	public function get_brand_settings()
	{
		// Define an array to store email settings
		$email_settings = array();
		$email_settings['woocommerce_email_from_name'] = get_option('woocommerce_email_from_name');
		$email_settings['woocommerce_email_from_address'] = get_option('woocommerce_email_from_address');
		$email_settings['woocommerce_email_header_image'] = get_option('woocommerce_email_header_image');
		$email_settings['woocommerce_email_footer_text'] = get_option('woocommerce_email_footer_text');
		$email_settings['woocommerce_email_base_color'] = get_option('woocommerce_email_base_color');
		$email_settings['woocommerce_email_background_color'] = get_option('woocommerce_email_background_color');
		$email_settings['woocommerce_email_body_background_color'] = get_option('woocommerce_email_body_background_color');
		$email_settings['woocommerce_email_text_color'] = get_option('woocommerce_email_text_color');
		$email_settings['woocommerce_merchant_email_notifications'] = get_option('woocommerce_merchant_email_notifications');

		return $email_settings;
	}

	/**
     * Updates the WooCommerce brand settings with new values.
     *
     * @return bool True if successful.
     */
	public function save_brand_settings()
	{
		//verified in get_item_permissions_check method
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$data = json_decode( stripslashes( $_REQUEST['data'] ), true );
		if (!empty($data['woocommerce_email_from_name'])) {
			update_option('woocommerce_email_from_name', sanitize_text_field($data['woocommerce_email_from_name']));
		}
		if (!empty($data['woocommerce_email_from_address'])) {
			update_option('woocommerce_email_from_address', sanitize_text_field($data['woocommerce_email_from_address']));
		}
		if (!empty($data['woocommerce_email_header_image'])) {
			update_option('woocommerce_email_header_image', sanitize_text_field($data['woocommerce_email_header_image']));
		}
		if (!empty($data['woocommerce_email_footer_text'])) {
			update_option('woocommerce_email_footer_text', sanitize_text_field($data['woocommerce_email_footer_text']));
		}
		if (!empty($data['woocommerce_email_base_color'])) {
			update_option('woocommerce_email_base_color', sanitize_text_field($data['woocommerce_email_base_color']));
		}
		if (!empty($data['woocommerce_email_background_color'])) {
			update_option('woocommerce_email_background_color', sanitize_text_field($data['woocommerce_email_background_color']));
		}
		if (!empty($data['woocommerce_email_body_background_color'])) {
			update_option('woocommerce_email_body_background_color', sanitize_text_field($data['woocommerce_email_body_background_color']));
		}
		if (!empty($data['woocommerce_email_text_color'])) {
			update_option('woocommerce_email_text_color', sanitize_text_field($data['woocommerce_email_text_color']));
		}
		if (!empty($data['woocommerce_merchant_email_notifications'])) {
			update_option('woocommerce_merchant_email_notifications', sanitize_text_field($data['woocommerce_merchant_email_notifications']));
		}
		return true;
	}

	/**
     * Updates the settings for a specific WooCommerce email template.
     *
     * @return bool True if successful.
     */
	public function save_email_settings()
	{
		// verified in get_item_permissions_check method
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$email_id = sanitize_text_field($_REQUEST['email_id']);
		//verified in get_item_permissions_check method
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$settings = json_decode( stripslashes( $_REQUEST['settings'] ), true );
		$settings = $settings['changedSettings'];

		$meta_name = 'woocommerce_' . $email_id .'_settings';

		update_option( $meta_name , $settings);
		return true;
	}
	
	/**
     * Sends a test email based on a specific WooCommerce email template.
     *
     * @return bool True if the test email was successfully sent.
     */
	public function send_test_email() {
		// Sanitize the email and preview URL inputs
		// verified in get_item_permissions_check method
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$emails = sanitize_text_field($_REQUEST['emails']); // Comma-separated email addresses
		// verified in get_item_permissions_check method
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$order_id = sanitize_text_field($_REQUEST['order_id']); // Comma-separated email addresses
		// verified in get_item_permissions_check method
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$email_id = sanitize_text_field($_REQUEST['email_id']); // Email obj id.
		// verified in get_item_permissions_check method
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$changedSettings = json_decode( stripslashes( $_REQUEST['changedSettings'] ), true );
		$changedSettings = Utils::sanitize_array($changedSettings);
		$preview = new WooEmailPreview($email_id, $changedSettings);
		$preview->generate_preview(['send_test_email'=>true, 'emails'=>$emails, 'order_id'=>$order_id]);

		return true;
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
