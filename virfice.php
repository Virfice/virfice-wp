<?php
/*
Plugin Name: Virfice
Description: Preview WooCommerce email templates within WordPress admin.
Version: 1.0.0
Author: Virfice
*/
use Virfice\API\API;
use Virfice\Dashboard;
use Virfice\WooEmailPreview\Route;
use Virfice\WooEmailEditWithButton;
require_once __DIR__ . '/vendor/autoload.php';

// Check if WooCommerce is installed and active during plugin activation
function virfice_check_woocommerce_activation() {
    // If WooCommerce class does not exist, WooCommerce is not installed or activated
    if (!class_exists('WooCommerce')) {
        // Deactivate the current plugin
        deactivate_plugins(plugin_basename(__FILE__));

        // Display an error message and stop execution
        wp_die(
            wp_kses(
                // Error message with instructions to install WooCommerce and a link back to the plugins page
                '<strong>Virfice:</strong> WooCommerce is required for this plugin to work. Please install and activate WooCommerce. <br><br> <a href="' . admin_url('plugins.php') . '">Go Back</a>',
                array(
                    'strong' => array(), // Allowed HTML tags
                    'br'     => array(),
                    'a'      => array('href'),
                )
            )
        );
    }
}

// Register the activation hook to check WooCommerce before activating the plugin
register_activation_hook(__FILE__, 'virfice_check_woocommerce_activation');

// Define plugin constants for easier reference
define('VIRFICE_VERISION', '1.0.0'); // Plugin version
define('VIRFICE_APP_NAME', 'Virfice'); // Plugin name
define('VIRFICE_APP_PREFIX', 'virfice'); // Prefix for naming consistency
define('VIRFICE_PLUGIN_ROOT', plugin_dir_path(__FILE__)); // Path to the plugin directory
define('VIRFICE_PLUGIN_BASE', plugin_dir_url(__FILE__)); // URL of the plugin directory

// Initialize the core components of the plugin
new Dashboard(); // Initialize the Dashboard component
new Route(); // Initialize routing for the plugin
new WooEmailEditWithButton(); // Initialize WooCommerce email editing with a button feature
new API(); // Initialize API functionality for the plugin