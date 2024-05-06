<?php
namespace Virfice\API;

// Exit if accessed directly for security
if (!defined('ABSPATH')) {
    exit; 
}

use WP_REST_Controller;
use WP_REST_Server;

/**
 * Class WooOrder
 * Handles REST API endpoints for retrieving WooCommerce orders in the Virfice plugin.
 */
class WooOrder extends WP_REST_Controller
{
	/**
     * WooOrder constructor.
     * Sets up the namespace and REST base for the custom REST API endpoints.
     */
	public function __construct()
	{
		$this->namespace = VIRFICE_APP_PREFIX . '/v1';
		$this->rest_base = 'woo-order';
	}

	/**
     * Registers REST API routes for WooCommerce order-related functionality.
     *
     * @return void
     */
	public function register_routes()
	{
		// Register a REST API endpoint to retrieve all WooCommerce orders
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

	/**
     * Retrieves a list of all WooCommerce orders.
     *
     * @return array An array of orders with metadata.
     */
	public function get_all_orders() {
        // Define query arguments for retrieving WooCommerce orders
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
     * Checks if a given REST API request has permission to access the endpoint.
     *
     * @param \WP_REST_Request $request The REST API request.
     *
     * @return bool True if the request has the correct permissions; otherwise, a WP_REST_Response with an error.
     */
	public function get_item_permissions_check($request)
	{
		// Only allow users with 'manage_woocommerce' capability to access the endpoint
        return current_user_can('manage_woocommerce');
	}
}
