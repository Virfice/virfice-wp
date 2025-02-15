<?php

namespace Virfice\API;

use Virfice\Includes\Templates;
use Virfice\MetaHelper;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

use Virfice\Utils;
use Virfice\WooEmailPreview\WooEmailPreview;
use WP_Error;
use WP_REST_Controller;
use WP_REST_Server;
use WPMailSMTP\Vendor\Monolog\Handler\Curl\Util;

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

		// Register a REST API endpoint to get a single email's settings
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/single-virfice',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array($this, 'get_single_email_virfice'),
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

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/virfice-brand-settings',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array($this, 'get_virfice_brand_settings'),
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

		// Register a REST API endpoint to update WooCommerce brand settings
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/virfice-brand-settings',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array($this, 'save_virfice_brand_settings'),
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

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/update-virfice-template-status',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array($this, 'update_virfice_template_status'),
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

			// if ($email_key === 'WC_Email_Customer_Reset_Password' || $email_key === 'WC_Email_Customer_New_Account') {
			// 	continue;
			// }

			$url = add_query_arg(array(
				'email_id' => $email_obj->id,
				'woo_preview_nonce' => wp_create_nonce('email_id_' . $email_obj->id),
			), home_url('/'));

			$formatted_email_lists[] = array(
				'id' => $email_obj->id,
				'key' => $email_key,
				'title' => $email_obj->get_title(),
				'email_type' => $email_obj->get_email_type(),
				'recipient' => $email_obj->get_recipient(),
				'previewUrl' => $url,
				'enabled' => $email_obj->enabled,
				'virfice_template_status' => Utils::isVirficeTemplateEnabled($email_obj->id)
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

	public function get_single_email_virfice()
	{
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$email_id = sanitize_text_field($_REQUEST['email_id']); // Email obj id.

		$_virfice_template_id = MetaHelper::get_meta(0, 'woo-email', $email_id . '_virfice_template_id', false);

		if ($_virfice_template_id) {
			$template = get_post($_virfice_template_id);
			if (!$template) {
				return false;
			}
			return array('id' => $template->ID, 'title' => $template->post_title);
		} else {
			return false;
		}
	}

	/**
	 * Retrieves the WooCommerce brand settings.
	 *
	 * @return array Brand settings for WooCommerce email templates.
	 */
	public function get_brand_settings()
	{
		return Utils::get_brand_settings();
	}

	/**
	 * Retrieves the WooCommerce brand settings.
	 *
	 * @return array Brand settings for WooCommerce email templates.
	 */
	public function get_virfice_brand_settings()
	{
		return Utils::get_virfice_brand_settings();
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
		$data = json_decode(stripslashes($_REQUEST['data']), true);

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
		if (isset($data['virfice_show_social_icons'])) {
			update_option('virfice_show_social_icons', sanitize_text_field($data['virfice_show_social_icons']), false);
		}
		if (isset($data['virfice_social_icons_heading'])) {
			update_option('virfice_social_icons_heading', sanitize_text_field($data['virfice_social_icons_heading']), false);
		}
		return true;
	}

	/**
	 * Updates the WooCommerce brand settings with new values.
	 *
	 * @return bool True if successful.
	 */
	public function save_virfice_brand_settings()
	{
		//verified in get_item_permissions_check method
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$data = json_decode(stripslashes($_REQUEST['data']), true);

		if (!empty($data['email_body_width'])) {
			MetaHelper::add_or_update_meta(0, 'brand-settings', 'email_body_width', $data['email_body_width']);
		}

		if (isset($data['logo'])) {
			MetaHelper::add_or_update_meta(0, 'brand-settings', 'logo', $data['logo']);
		}

		if (!empty($data['store_name'])) {
			MetaHelper::add_or_update_meta(0, 'brand-settings', 'store_name', $data['store_name']);
		}
		if (!empty($data['email_background_color'])) {
			MetaHelper::add_or_update_meta(0, 'brand-settings', 'email_background_color', $data['email_background_color']);
		}
		if (!empty($data['email_outer_background_color'])) {
			MetaHelper::add_or_update_meta(0, 'brand-settings', 'email_outer_background_color', $data['email_outer_background_color']);
		}
		if (!empty($data['email_body_text'])) {
			MetaHelper::add_or_update_meta(0, 'brand-settings', 'email_body_text', $data['email_body_text']);
		}
		if (!empty($data['email_body_button_bg'])) {
			MetaHelper::add_or_update_meta(0, 'brand-settings', 'email_body_button_bg', $data['email_body_button_bg']);
		}
		if (!empty($data['email_body_button_color'])) {
			MetaHelper::add_or_update_meta(0, 'brand-settings', 'email_body_button_color', $data['email_body_button_color']);
		}
		if (!empty($data['header_text_color'])) {
			MetaHelper::add_or_update_meta(0, 'brand-settings', 'header_text_color', $data['header_text_color']);
		}
		if (!empty($data['header_icons_color'])) {
			MetaHelper::add_or_update_meta(0, 'brand-settings', 'header_icons_color', $data['header_icons_color']);
		}
		if (!empty($data['header_background_color'])) {
			MetaHelper::add_or_update_meta(0, 'brand-settings', 'header_background_color', $data['header_background_color']);
		}
		if (!empty($data['footer_text_color'])) {
			MetaHelper::add_or_update_meta(0, 'brand-settings', 'footer_text_color', $data['footer_text_color']);
		}
		if (!empty($data['footer_icons_color'])) {
			MetaHelper::add_or_update_meta(0, 'brand-settings', 'footer_icons_color', $data['footer_icons_color']);
		}
		if (!empty($data['footer_link_color'])) {
			MetaHelper::add_or_update_meta(0, 'brand-settings', 'footer_link_color', $data['footer_link_color']);
		}
		if (!empty($data['footer_background_color'])) {
			MetaHelper::add_or_update_meta(0, 'brand-settings', 'footer_background_color', $data['footer_background_color']);
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
		$settings = json_decode(stripslashes($_REQUEST['settings']), true);
		$settings = $settings['changedSettings'];

		$meta_name = 'woocommerce_' . $email_id . '_settings';

		update_option($meta_name, $settings);
		return true;
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
		// verified in get_item_permissions_check method
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$order_id = sanitize_text_field($_REQUEST['order_id']); // Comma-separated email addresses
		// verified in get_item_permissions_check method
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$email_id = sanitize_text_field($_REQUEST['email_id']); // Email obj id.
		// verified in get_item_permissions_check method
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$changedSettings = json_decode(stripslashes($_REQUEST['changedSettings']), true);
		$changedSettings = Utils::sanitize_array($changedSettings);
		$changedSettings = $this->merge_social_icons_settings($changedSettings);
		$preview = new WooEmailPreview($email_id, $changedSettings);
		$preview->generate_preview(['send_test_email' => true, 'emails' => $emails, 'order_id' => $order_id]);

		return true;
	}

	/**
	 * Merges social icons settings with the given settings.
	 * This function is used to merge the social icons settings with the given settings.
	 * It checks if the 'virfice_show_social_icons' setting is set to true and if so, it adds the social icons settings to the given settings.
	 * If the 'virfice_show_social_icons' setting is not set or is false, it returns the given settings as is.
	 * @param array $changedSettings The settings to merge with the social icons settings.
	 * @return array The merged settings.
	 * @since 1.0.0
	 */
	public function merge_social_icons_settings($changedSettings)
	{
		if (isset($changedSettings['virfice_show_social_icons'])) {
			$changedSettings['virfice_show_social_icons'] = sanitize_text_field($changedSettings['virfice_show_social_icons']);
		} else {
			$changedSettings['virfice_show_social_icons'] = get_option('virfice_show_social_icons');
		}
		if (isset($changedSettings['virfice_social_icons_heading'])) {
			$changedSettings['virfice_social_icons_heading'] = sanitize_text_field($changedSettings['virfice_social_icons_heading']);
		} else {
			$changedSettings['virfice_social_icons_heading'] = get_option('virfice_social_icons_heading', 'Follow us on');
		}

		return $changedSettings;
	}

	public function update_virfice_template_status($changedSettings)
	{
		$email_id = sanitize_text_field($_REQUEST['email_id']);
		$status = Utils::get_boolean_value(sanitize_text_field($_REQUEST['status']));
		MetaHelper::add_or_update_meta(0, 'woo-email', $email_id . '_virfice_template_status', $status);

		if ($status == true) {
			//insert a template if not exists
			$_virfice_template_id = MetaHelper::get_meta(0, 'woo-email', $email_id . '_virfice_template_id', false);
			if ($_virfice_template_id == false) {
				$template_content = $this->get_woo_email_virfice_template_preset($email_id);
				$template_id = Templates::insert_template($email_id . ' - Virfice', $template_content);
				if ($template_id) {
					MetaHelper::add_or_update_meta(0, 'woo-email', $email_id . '_virfice_template_id', $template_id);
				}
			} else {
				$template_content = $this->get_woo_email_virfice_template_preset($email_id);
				Templates::update_template($_virfice_template_id, $email_id . ' - Virfice', $template_content);
			}
		}
		return true;
	}

	private function get_woo_email_virfice_template_preset($email_id)
	{
		$templateFilePath = VIRFICE_PLUGIN_ROOT . "/src/woo-email-presets/$email_id.php";
		// Check if the template file exists
		if (!file_exists($templateFilePath)) {
			return false; // Handle error (e.g., file not found)
		}

		// Start output buffering
		ob_start();

		// Include the template file, and its output will be captured
		include $templateFilePath;

		// Get the content of the buffer and clean the buffer
		$templateContent = ob_get_clean();

		return $templateContent;
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
