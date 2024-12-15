<?php

namespace Virfice\API;

use Virfice\Utils;

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
class VirficeTemplate extends WP_REST_Controller
{
    /**
     * WooOrder constructor.
     * Sets up the namespace and REST base for the custom REST API endpoints.
     */
    public function __construct()
    {
        $this->namespace = VIRFICE_APP_PREFIX . '/v1';
        $this->rest_base = 'virfice-template';
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
            '/' . $this->rest_base . '/single',
            array(
                array(
                    'methods'             => 'GET',
                    'callback'            => array($this, 'single_template'),
                    'permission_callback' => array($this, 'get_item_permissions_check'),
                    'args'                => $this->get_endpoint_args_for_item_schema(WP_REST_Server::READABLE),
                ),
                'schema' => array($this, 'get_item_schema'),
            )
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/save',
            array(
                array(
                    'methods'             => 'POST',
                    'callback'            => array($this, 'save_template'),
                    'permission_callback' => array($this, 'get_item_permissions_check'),
                    'args'                => $this->get_endpoint_args_for_item_schema(WP_REST_Server::READABLE),
                ),
                'schema' => array($this, 'get_item_schema'),
            )
        );
    }

    public function single_template($request)
    {
        $template_id = (int) sanitize_text_field($request->get_param('id'));
        $template = get_post($template_id);
        $template->global_style = Utils::get_template_common_global_css();
        return $template;
    }

    public function save_template($request)
    {
        $template_id = (int) sanitize_text_field($_REQUEST['template_id']);
        $post_content = $this->sanitize_html_template($_REQUEST['post_content']);
        //save post info
        $args = array(
            'ID'           => $template_id
        );

        if ($post_content) {
            $args['post_content'] = $post_content;
        }
        // Update the post into the database
        wp_update_post($args);

        return true;
    }

    private function sanitize_html_template($string)
    {
        return Utils::virfice_wp_kses_allowed_html($string);
        //TODO: need to fix css 
        // Define allowed HTML tags and their attributes
        $allowed_html = array(
            'table' => array(
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'tbody' => array(),
            'tr' => array(
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'td' => array(
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'div' => array(
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'span' => array(
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'p' => array(
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'a' => array(
                'href' => array(),
                'title' => array(),
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'img' => array(
                'src' => array(),
                'alt' => array(),
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'h1' => array(
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'h2' => array(
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'h3' => array(
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'h4' => array(
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'ul' => array(
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'li' => array(
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'ol' => array(
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'br' => array(),
            'em' => array(
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'strong' => array(
                'style' => array(),
                'virfice-title' => array(),
                'virfice-ele_type' => array(),
                'virfice-id' => array(),
            ),
            'style' => array(), // Allow <style> tag itself
        );

        // Fetch and sanitize the input
        $post_content = $string;
        $sanitized_post_content = wp_kses($post_content, $allowed_html);

        // Now you can safely store or output $sanitized_post_content
        return $sanitized_post_content;
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
