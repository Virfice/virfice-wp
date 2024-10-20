<?php

namespace Virfice\Includes;

// Security check to ensure this file is not accessed directly
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * templates crude class
 */
class Templates
{

    /**
     * get template data
     */
    public static function get_template($template_id)
    {
        $post = get_post($template_id);
        return $post;
    }

    /**
     * insert new template
     */
    public static function insert_template($template_name = 'My New Template', $template_content = false)
    {
        //insert as virfice_template post type
        $post_id = wp_insert_post(array(
            'post_title' => $template_name,
            'post_type' => 'virfice_template',
            'post_status' => 'publish',
            'post_content' => $template_content,
        ));
        return $post_id;
    }

    /**
     * update template
     */
    public static function update_template($template_id, $template_name = 'My New Template', $template_content = false)
    {
        //update as virfice_template post type
        $post_id = wp_update_post(array(
            'ID' => $template_id,
            'post_title' => $template_name,
            'post_content' => $template_content,
        ));
        return $post_id;
    }

    /**
     * delete template
     */
    public static function delete_template($template_id)
    {
        //delete as virfice_template post type
        $post_id = wp_delete_post($template_id, true);
        return $post_id;
    }
}
