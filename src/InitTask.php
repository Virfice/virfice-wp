<?php

namespace Virfice;

use Virfice\Includes\Templates;

// Security check to ensure this file is not accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class InitTask
 * Handles the WordPress InitTask elements for the Virfice plugin.
 */
class InitTask
{
    /**
     * InitTask constructor.
     * Registers WordPress hooks for the plugin's admin-related features.
     */
    public function __construct()
    {
        // // Hook for plugin activation
        register_activation_hook(__FILE__, [$this, 'on_plugin_activation']);

        // // Hook for plugin updates
        add_action('init', [$this, 'check_for_update']);
    }

    /**
     * Runs on plugin activation.
     * Creates default templates if they do not exist.
     */
    public function on_plugin_activation()
    {
        $this->create_template_for_brand_settings();
    }

    /**
     * Checks for plugin updates and creates templates if necessary.
     */
    public function check_for_update()
    {
        $current_version = get_option('virfice_plugin_version', '1.0.0');
        $new_version = VIRFICE_VERISION; // Replace with your actual plugin version

        if (version_compare($current_version, $new_version, '<')) {
            // Update stored version
            update_option('virfice_plugin_version', $new_version);

            //create brand settings dummy template
            $this->create_template_for_brand_settings();
        }

        if (VIRFICE_DEBUG) {
            /**
             * dummy code start
             */
            //create brand settings dummy template
            $brand_settings_template_id = MetaHelper::get_meta(0, 'brand-settings', 'template_id', false);
            if ($brand_settings_template_id) {
                $template_content = $this->get_virfice_brand_settings_template_preset();
                Templates::update_template($brand_settings_template_id, 'Virfice - Brand settings', $template_content);
            } else {
                $this->create_template_for_brand_settings();
            }
            /**
             * dummy code end
             */
        }
    }

    /**
     * Creates default templates if they don't already exist.
     */
    public function create_template_for_brand_settings()
    {
        $brand_settings_template_id = MetaHelper::get_meta(0, 'brand-settings', 'template_id', false);

        if ($brand_settings_template_id == false) {
            $template_content = $this->get_virfice_brand_settings_template_preset();
            $template_id = Templates::insert_template('Virfice - Brand settings', $template_content);

            if ($template_id) {
                MetaHelper::add_or_update_meta(0, 'brand-settings', 'template_id', $template_id);
            }
        }
    }

    /**
     * Example: Generates default content for a WooCommerce email template.
     *
     * @param string $email_id Email identifier.
     * @return string Template content.
     */
    private function get_virfice_brand_settings_template_preset()
    {
        $templateFilePath = VIRFICE_PLUGIN_ROOT . "/src/woo-email-presets/dummy_email_template_for_brand_settings.php";
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
}
