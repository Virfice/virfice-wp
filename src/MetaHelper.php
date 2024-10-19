<?php

namespace Virfice;

// Security check to ensure this file is not accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Summary of MetaHelper
 * This class provides helper methods for managing meta data in the Virfice plugin.
 * It includes methods for creating and managing meta data tables, as well as retrieving and updating meta data.
 * It also includes methods for retrieving and updating meta data.
 * It also includes methods for retrieving and updating meta data.
 */
class MetaHelper
{

    private $db_charset_collate;

    public function __construct()
    {
        global $wpdb;

        // Setting up charset collate (if not already done in your constructor)
        $this->db_charset_collate = $wpdb->get_charset_collate();

        // Create the meta table
        $this->create_meta_table();
    }

    private function create_meta_table()
    {
        global $wpdb;

        // Name of the meta table
        $table_name = $wpdb->prefix . VIRFICE_APP_PREFIX . '_meta';

        // SQL query to create the table if it doesn't exist
        $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            parent_id int unsigned NOT NULL,
            parent varchar(50) NOT NULL,
            meta_key varchar(100) NOT NULL,
            meta_value LONGTEXT DEFAULT NULL,
            PRIMARY KEY (parent_id, parent, meta_key)
        ) {$this->db_charset_collate};";

        // dbDelta handles the creation of the table
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    // Method to add or update meta
    public static function add_or_update_meta($parent_id, $parent, $meta_key, $meta_value)
    {
        global $wpdb;
        $table_name = $wpdb->prefix . VIRFICE_APP_PREFIX . '_meta';

        // Check if the meta already exists
        $meta_exists = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM $table_name WHERE parent_id = %d AND parent = %s AND meta_key = %s",
            $parent_id,
            $parent,
            $meta_key
        ));

        if ($meta_exists) {
            // Update existing meta
            $wpdb->update(
                $table_name,
                array('meta_value' => $meta_value),
                array('parent_id' => $parent_id, 'parent' => $parent, 'meta_key' => $meta_key),
                array('%s'),
                array('%d', '%s', '%s')
            );
        } else {
            // Insert new meta
            $wpdb->insert(
                $table_name,
                array(
                    'parent_id' => $parent_id,
                    'parent' => $parent,
                    'meta_key' => $meta_key,
                    'meta_value' => $meta_value
                ),
                array('%d', '%s', '%s', '%s')
            );
        }
    }

    // Method to get meta
    public static function get_meta($parent_id, $parent, $meta_key, $default = null)
    {
        global $wpdb;
        $table_name = $wpdb->prefix . VIRFICE_APP_PREFIX . '_meta';

        $meta_value = $wpdb->get_var($wpdb->prepare(
            "SELECT meta_value FROM $table_name WHERE parent_id = %d AND parent = %s AND meta_key = %s",
            $parent_id,
            $parent,
            $meta_key
        ));

        return $meta_value !== null ? $meta_value : $default;
    }

    // Method to delete meta
    public static function delete_meta($parent_id, $parent, $meta_key)
    {
        global $wpdb;
        $table_name = $wpdb->prefix . VIRFICE_APP_PREFIX . '_meta';

        $wpdb->delete(
            $table_name,
            array(
                'parent_id' => $parent_id,
                'parent' => $parent,
                'meta_key' => $meta_key
            ),
            array('%d', '%s', '%s')
        );
    }
}
