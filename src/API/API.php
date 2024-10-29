<?php

namespace Virfice\API;

// Security check to ensure this file is not accessed directly
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Class API
 * Registers custom REST API endpoints for the Virfice plugin.
 */
class API
{
    /**
     * API constructor.
     * Adds action to register custom REST API endpoints when WordPress REST API is initialized.
     */
    public function __construct()
    {
        add_action('rest_api_init', array($this, 'register_api'));
    }

    /**
     * Register custom REST API endpoints for the Virfice plugin.
     *
     * @return void
     */
    public function register_api()
    {
        // Register routes for handling WooCommerce email related requests
        (new WooEmail())->register_routes();

        // Register routes for handling WooCommerce order related requests
        (new WooOrder())->register_routes();
        (new Settings())->register_routes();
        (new VirficeTemplate())->register_routes();
        (new VirficeTestEmailSend())->register_routes();
    }
}
