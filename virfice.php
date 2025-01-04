<?php
/*
Plugin Name: Virfice
Description: Customize WooCommerce emails easily. Ensure your emails represent your store brand.
Author: Virfice
Author URI: https://virfice.com/
Version: 1.0.3
License: GPL v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Requires at least: 5.2
Requires PHP: 7.2
*/
if (!defined('ABSPATH')) exit; // Exit if accessed directly 

use Virfice\AdminNotice;
use Virfice\API\API;
use Virfice\Dashboard;
use Virfice\WooEmailPreview\Route as WooEmailPreviewRoute;
use Virfice\WooEmailEditWithButton;
use Virfice\WooEmailHooks;

require_once __DIR__ . '/vendor/autoload.php';

// Check if WooCommerce is installed and active during plugin activation
function virfice_check_woocommerce_activation()
{
    // Check if this is the first installation
    if (!get_option('virfice_first_install')) {
        // Set the flag in the database
        update_option('virfice_first_install', true);
    }

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

    // if (is_admin()) { // Check if in the admin area
    //     add_rewrite_rule(
    //         '^virfice$', // Custom URL: https://wordpress.test/virfice
    //         'wp-admin/admin.php?page=virfice', // Redirect target
    //         'top'
    //     );
    // }
    // flush_rewrite_rules(); // Saves changes to .htaccess
    
}

/**
 * Deactivates the plugin and removes rewrite rules.
 */
// function virfice_deactivation_plugin()
// {
//     flush_rewrite_rules(); // Removes changes from .htaccess
// }

// Register the activation hook to check WooCommerce before activating the plugin
register_activation_hook(__FILE__, 'virfice_check_woocommerce_activation');
// Plugin deactivation hook to clean up
// register_deactivation_hook(__FILE__, 'deactivate_plugin');



// Define plugin constants for easier reference
define('VIRFICE_VERISION', '1.0.3'); // Plugin version
define('VIRFICE_APP_NAME', 'Virfice'); // Plugin name
define('VIRFICE_APP_PREFIX', 'virfice'); // Prefix for naming consistency
define('VIRFICE_PLUGIN_ROOT', plugin_dir_path(__FILE__)); // Path to the plugin directory
define('VIRFICE_PLUGIN_VIEWS_ROOT', VIRFICE_PLUGIN_ROOT . '/src/views'); // Path to the plugin directory
define('VIRFICE_PLUGIN_BASE', plugin_dir_url(__FILE__)); // URL of the plugin directory
define('VIRFICE_STATIC_FILES_BASE', VIRFICE_PLUGIN_BASE . 'assets/files'); // URL of the plugin directory

// Initialize the core components of the plugin
new AdminNotice();
new Dashboard(); // Initialize the Dashboard component
new WooEmailPreviewRoute(); // Initialize routing for the plugin
new WooEmailEditWithButton(); // Initialize WooCommerce email editing with a button feature
new API(); // Initialize API functionality for the plugin

new WooEmailHooks();