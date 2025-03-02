<?php

namespace Virfice\API;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

use WP_Error;
use WP_REST_Controller;
use WP_REST_Server;

/**
 * Class Settings
 * Manages REST API endpoints for WooCommerce email customization in the Virfice plugin.
 */
class Settings extends WP_REST_Controller
{
	/**
	 * Settings constructor.
	 * Initializes REST API namespace and base route.
	 */
	public function __construct()
	{
		$this->namespace = VIRFICE_APP_PREFIX . '/v1';
		$this->rest_base = 'settings';
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
			'/' . $this->rest_base . '/get-settings',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array($this, 'get_settings'),
					'permission_callback' => array($this, 'get_item_permissions_check'),
					'args'                => $this->get_endpoint_args_for_item_schema(WP_REST_Server::READABLE),
				),
				'schema' => array($this, 'get_item_schema'),
			)
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/save-settings',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array($this, 'save_settings'),
					'permission_callback' => array($this, 'get_item_permissions_check'),
					'args'                => $this->get_endpoint_args_for_item_schema(WP_REST_Server::READABLE),
				),
				'schema' => array($this, 'get_item_schema'),
			)
		);
	}

	public function get_settings()
	{
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$keys = json_decode(stripslashes($_REQUEST['keys']), true);
		$data = [];
		foreach ($keys as $key => $value) {
			if ($value === 'email') {
				$data[$value] = self::get_email_settings();
			}
			if ($value === 'brand') {
				$data[$value] = self::get_social_links();
			}
			// $s = get_option( VIRFICE_APP_PREFIX .'-settings-'.$value );
			// $data[ $value ] = $s ? $s : [];
		}

		return $data;
	}

	public static function get_email_settings()
	{
		$array = [
			'woocommerce_email_from_name' => get_option('woocommerce_email_from_name'),
			'woocommerce_email_from_address' => get_option('woocommerce_email_from_address'),
			'virfice_reply_to_name' => get_option('virfice_reply_to_name'),
			'virfice_reply_to_email' => get_option('virfice_reply_to_email'),
			'virfice_address' => get_option('virfice_address'),
			'virfice_country' => get_option('virfice_country'),
			'virfice_city' => get_option('virfice_city'),
			'virfice_store_name' => get_option('virfice_store_name', get_option('blogname')),
			'virfice_website_url' => get_option('virfice_website_url'),
			'virfice_sending_frequency_email' => get_option('virfice_sending_frequency_email', 10),
			'virfice_sending_frequency_delay' => get_option('virfice_sending_frequency_delay', 1),
		];
		// $array = array_merge($array, self::get_social_links());

		return $array;
	}

	public static function get_social_links()
	{

		return [
			'virfice_facebook_url' => get_option('virfice_facebook_url', false),
			'virfice_instagram_url' => get_option('virfice_instagram_url', false),
			'virfice_youTube_url' => get_option('virfice_youTube_url', false),
			'virfice_x_url' => get_option('virfice_x_url', false),
			'virfice_tiktok_url' => get_option('virfice_tiktok_url', false),
			'virfice_snapchat_url' => get_option('virfice_snapchat_url', false),
			'virfice_pinterest_url' => get_option('virfice_pinterest_url', false),
			'virfice_tumblr_url' => get_option('virfice_tumblr_url', false),
			'virfice_vimeo_url' => get_option('virfice_vimeo_url', false),
			'virfice_telegram_url' => get_option('virfice_telegram_url', false),
			'virfice_vk_url' => get_option('virfice_vk_url', false),
			'virfice_phone_url' => get_option('virfice_phone_url', false),
		];
	}

	public function save_settings()
	{
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$key = sanitize_text_field($_REQUEST['key']);
		// // phpcs:ignore WordPress.Security.NonceVerification.Recommended 
		$settings = json_decode(stripslashes($_REQUEST['settings']), true);
		switch ($key) {
			case 'email': {
					if (isset($settings['woocommerce_email_from_name'])) {
						update_option('woocommerce_email_from_name', $settings['woocommerce_email_from_name']);
					}
					if (isset($settings['woocommerce_email_from_address'])) {
						update_option('woocommerce_email_from_address', $settings['woocommerce_email_from_address']);
					}
					if (isset($settings['virfice_reply_to_name'])) {
						update_option('virfice_reply_to_name', $settings['virfice_reply_to_name'], false);
					}
					if (isset($settings['virfice_reply_to_email'])) {
						update_option('virfice_reply_to_email', $settings['virfice_reply_to_email'], false);
					}
					if (isset($settings['virfice_address'])) {
						update_option('virfice_address', $settings['virfice_address'], false);
					}
					if (isset($settings['virfice_country'])) {
						update_option('virfice_country', $settings['virfice_country'], false);
					}
					if (isset($settings['virfice_city'])) {
						update_option('virfice_city', $settings['virfice_city'], false);
					}
					if (isset($settings['virfice_store_name'])) {
						update_option('virfice_store_name', $settings['virfice_store_name'], false);
					}
					if (isset($settings['virfice_website_url'])) {
						update_option('virfice_website_url', $settings['virfice_website_url'], false);
					}
					if (isset($settings['virfice_sending_frequency_email'])) {
						update_option('virfice_sending_frequency_email', $settings['virfice_sending_frequency_email'], false);
					}
					if (isset($settings['virfice_sending_frequency_delay'])) {
						update_option('virfice_sending_frequency_delay', $settings['virfice_sending_frequency_delay'], false);
					}

					return true;
				}
			case 'brand': {
					if (isset($settings['virfice_facebook_url'])) {
						update_option('virfice_facebook_url', $settings['virfice_facebook_url'], false);
					}
					if (isset($settings['virfice_instagram_url'])) {
						update_option('virfice_instagram_url', $settings['virfice_instagram_url'], false);
					}
					if (isset($settings['virfice_youTube_url'])) {
						update_option('virfice_youTube_url', $settings['virfice_youTube_url'], false);
					}
					if (isset($settings['virfice_x_url'])) {
						update_option('virfice_x_url', $settings['virfice_x_url'], false);
					}
					if (isset($settings['virfice_tiktok_url'])) {
						update_option('virfice_tiktok_url', $settings['virfice_tiktok_url'], false);
					}
					if (isset($settings['virfice_snapchat_url'])) {
						update_option('virfice_snapchat_url', $settings['virfice_snapchat_url'], false);
					}
					if (isset($settings['virfice_pinterest_url'])) {
						update_option('virfice_pinterest_url', $settings['virfice_pinterest_url'], false);
					}
					if (isset($settings['virfice_tumblr_url'])) {
						update_option('virfice_tumblr_url', $settings['virfice_tumblr_url'], false);
					}
					if (isset($settings['virfice_vimeo_url'])) {
						update_option('virfice_vimeo_url', $settings['virfice_vimeo_url'], false);
					}if (isset($settings['virfice_telegram_url'])) {
						update_option('virfice_telegram_url', $settings['virfice_telegram_url'], false);
					}if (isset($settings['virfice_vk_url'])) {
						update_option('virfice_vk_url', $settings['virfice_vk_url'], false);
					}if (isset($settings['virfice_phone_url'])) {
						update_option('virfice_phone_url', $settings['virfice_phone_url'], false);
					}

					return true;
				}
			default: {
					return new WP_Error('woocommerce_rest_invalid_key', __('Invalid key.', 'woocommerce'), array('status' => 400));
				}
		}
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