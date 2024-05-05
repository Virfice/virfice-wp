<?php

namespace Virfice\API;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}
use WP_REST_Controller;
use WP_REST_Server;

/**
 * ContentManagerRest
 * 
 */
class WooOrder extends WP_REST_Controller
{
	/**
	 * Initialize the media class
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->namespace = VIRFICE_APP_PREFIX . '/v1';
		$this->rest_base = 'woo-order';
	}

	/**
	 * Register register
	 *
	 * @return void
	 */
	public function register_routes()
	{
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/all',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array($this, 'get_all_orders'),
					'permission_callback' => array($this, 'get_item_permissions_check'),
					'args'                => $this->get_endpoint_args_for_item_schema(WP_REST_Server::READABLE),
				),
				'schema' => array($this, 'get_item_schema'),
			)
		);
	}

	public function get_all_orders() {
        // Define query arguments for WP_Query
        $args = array(
            'post_type' => 'shop_order', // WooCommerce orders are of 'shop_order' type
            'posts_per_page' => 20, // Number of orders to retrieve
            'post_status' => array_keys(wc_get_order_statuses()), // Retrieve published orders
        );
        $orders = wc_get_orders( $args );
        $data = [];
        foreach ($orders as $key => $order) {
            $temp = array();
            $temp['id'] = $order->get_id();
            $temp['order_number'] = $order->get_order_number();
            $temp['value'] = $temp['id'];
            $temp['title'] = 'Order #' . $temp['id'];
            $data[] = $temp;
        }
        return $data;
    }

	/**
	 * Checks if a given request has access to read contacts.
	 *
	 * @param \WP_REST_Request $request user request(not used right now).
	 *
	 * @return \WP_REST_Response
	 */
	public function get_item_permissions_check($request)
	{
		// Only allow users with 'manage_woocommerce' capability to access the endpoint
        return current_user_can('manage_woocommerce');
	}
}
