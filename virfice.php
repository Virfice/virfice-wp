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

// Prevent activation if WooCommerce is not active
function virfice_check_woocommerce_activation() {
    if (!class_exists('WooCommerce')) {
        deactivate_plugins(plugin_basename(__FILE__)); // Deactivate the current plugin
        wp_die(
            wp_kses('<strong>Virfice:</strong> WooCommerce is required for this plugin to work. Please install and activate WooCommerce. <br><br> <a href="' . admin_url('plugins.php') . '">Go Back</a>', array(
                'strong'  => array(),
                'br'   => array(),
                'a' => array('href'),
            ))
        );
    }
}
register_activation_hook(__FILE__, 'virfice_check_woocommerce_activation');


define('VIRFICE_VERISION', '1.0.0');
define('VIRFICE_APP_NAME', 'Virfice');
define('VIRFICE_APP_PREFIX', 'virfice');
define('VIRFICE_PLUGIN_ROOT', plugin_dir_path( __FILE__ ) );
define('VIRFICE_PLUGIN_BASE', plugin_dir_url(__FILE__) );

new Dashboard();

new Route();

new WooEmailEditWithButton();

new API();