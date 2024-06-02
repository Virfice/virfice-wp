<?php
namespace Virfice;

// Security check to prevent direct access to the script
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class WooEmailEditWithButton
 * Adds a custom "Preview" button to WooCommerce email settings and handles script enqueuing.
 */
class WooEmailEditWithButton
{
    /**
     * WooEmailEditWithButton constructor.
     * Registers the necessary WordPress hooks for adding preview buttons and script enqueuing.
     */
    public function __construct()
    {
        add_filter('woocommerce_email_setting_columns', [$this, 'add_email_preview_button']);
        add_action('woocommerce_email_setting_column_preview', [$this, 'render_email_preview_button']);

        // Define a function to enqueue your custom script
        add_action('admin_enqueue_scripts', [$this, 'my_plugin_enqueue_script']);
    }

    /**
     * Enqueues custom scripts for the WooCommerce email settings page.
     *
     * @param string $hook The current admin page hook.
     *
     * @return void
     */
    public function my_plugin_enqueue_script($hook) {
        global $pagenow;
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        $page = sanitize_text_field(isset($_REQUEST['page']) ? $_REQUEST['page']:'');
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        $tab = sanitize_text_field(isset($_REQUEST['tab']) ? $_REQUEST['tab']:'');
        // Check if the current page is the WooCommerce settings page and the tab is "email"
        if ($pagenow === 'admin.php' && $page === 'wc-settings' && $tab === 'email') {
            // Enqueue your script
            wp_enqueue_script(VIRFICE_APP_PREFIX, plugins_url('../assets/js/Public/woo-email-preview-button-handler.min.js', __FILE__), array(), VIRFICE_VERISION, true);
            wp_enqueue_style( VIRFICE_APP_PREFIX, plugins_url( '../assets/css/Public/woo-email-preview-button-handler-style.min.css', __FILE__ ), array(), VIRFICE_VERISION );
        }
    }

    /**
     * Adds a custom "Preview" column to the WooCommerce email settings page.
     *
     * @param array $columns The original WooCommerce email settings columns.
     *
     * @return array The modified WooCommerce email settings columns with the preview button.
     */
    public function add_email_preview_button($columns) {
        $new_email_data = array();
        foreach ($columns as $key => $value) {
            // Insert "Preview" option before "Actions"
            if ($key === "actions") {
                $new_email_data['preview'] = '';
            }
            $new_email_data[$key] = $value;
        }
        return $new_email_data;
    }

    /**
     * Renders the "Preview" button in the custom column on the WooCommerce email settings page.
     *
     * @param object $email The WooCommerce email object.
     *
     * @return void
     */
    public function render_email_preview_button($email) {
        // Get the email ID
        $email_id = $email->id;
        
        // Create a URL for editing the email with Virfice
        $url = add_query_arg(
            array(
                'page' => VIRFICE_APP_PREFIX, // The Virfice plugin page
                'menu' => 'woo-email-edit',  // The email editing menu
                'email_id' => $email_id,    // The ID of the email to edit
            )
        );

        // Render the "Edit with Virfice" link with a Dashicon
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        printf(
            '<td><a href="%s" class="%s-preview-button"><span class="dashicons dashicons-edit"></span> Edit with %s</a></td>',
            // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            esc_url($url),
            // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            esc_html(VIRFICE_APP_PREFIX),
            // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            VIRFICE_APP_NAME
        );
    }
}
?>