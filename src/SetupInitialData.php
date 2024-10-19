<?php

namespace Virfice;

// Security check to ensure this file is not accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Dashboard
 * Handles the WordPress dashboard elements for the Virfice plugin.
 * This class manages menu creation, script enqueueing, and other admin-related tasks.
 */
class SetupInitialData
{
    /**
     * Dashboard constructor.
     * Registers WordPress hooks for the plugin's admin-related features.
     */
    public function __construct()
    {
        add_action('init', [$this, 'change_woo_email_template_to_verfice_email_template']);
    }

    public function change_woo_email_template_to_verfice_email_template()
    {
        //TODO: add all related meta data for woo email redirection
        // create new template post type if not created one
        // add template id inside meta table using woo email_id
        // loop

    }
}
