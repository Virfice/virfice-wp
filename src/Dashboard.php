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
class Dashboard
{
    /**
     * Dashboard constructor.
     * Registers WordPress hooks for the plugin's admin-related features.
     */
    public function __construct()
    {
        // Add a custom menu to the admin sidebar
        add_action('admin_menu', [$this, 'my_plugin_menu']);

        // Add custom styles to the admin header
        // add_action('admin_head', [$this, 'admin_styles']);

        // Enqueue custom scripts and styles for the plugin's admin page
        add_action('admin_enqueue_scripts', [$this, 'my_plugin_enqueue_script']);
        add_action('admin_print_styles', [$this, 'my_plugin_admin_inline_css']);

        // Add a custom rewrite rule
        // add_action('init', [$this, 'rewrite_route']);
        add_action('admin_head', [$this, 'my_plugin_highlight_submenu']);
        add_action('admin_footer', [$this, 'my_plugin_custom_script']);

        add_filter('plugin_action_links_' . VIRFICE_PLUGIN_BASE_FILE, [$this, 'my_plugin_action_links']);
    }

    public function my_plugin_action_links($links)
    {
        $settings_link = '<a href="admin.php?page=virfice&menu=settings">Settings</a>';
        $docs_link = '<a href="https://virfice.com/docs" target="_blank">Documentation</a>';

        array_unshift($links, $settings_link, $docs_link);
        return $links;
    }


    public function my_plugin_highlight_submenu()
    {
        global $submenu_file;

        if (isset($_GET['menu'])) {
            switch ($_GET['menu']) {
                case 'dashboard': {
                        $submenu_file = 'virfice&menu=dashboard';
                        break;
                    }
                case 'woo-email-edit-preview-virfice':
                case 'woo-email-edit-virfice':
                case 'woo-email-edit':
                case 'woo-email-list': {
                        $submenu_file = 'virfice&menu=woo-email-list';
                        break;
                    }
                case 'virfice-brand-settings':
                case 'brand-settings':
                case 'settings': {
                        $submenu_file = 'virfice&menu=settings';
                        break;
                    }
                    // case 'builder': {
                    //         $submenu_file = 'virfice&menu=builder';
                    //         break;
                    //     }
            }
        } else {
            // Default to dashboard if no menu parameter is set
            $submenu_file = 'virfice&menu=dashboard';
        }
    }

    public function my_plugin_custom_script()
    {
?>
        <script type="text/javascript">
            (function($) {
                var currentUrl = window.location.href;

                $('#toplevel_page_<?php echo esc_html(VIRFICE_APP_PREFIX); ?> .wp-submenu .wp-first-item').remove();
                $('#toplevel_page_<?php echo esc_html(VIRFICE_APP_PREFIX); ?> .wp-submenu a').each(function() {
                    if (currentUrl.indexOf($(this).attr('href')) !== -1) {
                        $(this).parent().addClass('current');
                        $(this).closest('.wp-has-submenu').addClass('current wp-menu-open');
                    }
                });
            })(jQuery);
        </script>
<?php
    }

    /**
     * Adds a custom rewrite rule to map a specific URL structure to the plugin's admin page.
     * This can be used to create custom routes within the WordPress admin area.
     *
     * @return void
     */
    public function rewrite_route()
    {
        // add_rewrite_rule('^(.+)', 'admin.php?page=' . VIRFICE_APP_PREFIX, 'top');
    }

    /**
     * Outputs custom styles in the WordPress admin header.
     * This is used to add a custom icon to the plugin's menu item.
     *
     * @return void
     */
    public function my_plugin_admin_inline_css()
    {
        $admin_css =  '
        <style>
            .dashicons-virfice{
                background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M19.6005%2011.7227L13.5821%205.60673C12.9986%205.01376%2012.7068%204.71726%2012.3663%204.50523C12.0645%204.31725%2011.7354%204.17872%2011.3911%204.09473C11.0028%204%2010.5902%204%209.76498%204H8.40216C6.51259%204%205.5678%204%204.84608%204.37369C4.21125%204.7024%203.69511%205.22691%203.37164%205.87203C3.00391%206.60544%203.00391%207.56554%203.00391%209.48573V14.5143C3.00391%2016.4345%203.00391%2017.3946%203.37164%2018.128C3.69511%2018.7731%204.21125%2019.2976%204.84608%2019.6263C5.5678%2020%206.51259%2020%208.40216%2020H16.2267C17.5274%2020%2018.1779%2020%2018.7025%2019.8201C19.7008%2019.478%2020.4844%2018.6817%2020.8211%2017.6672C20.998%2017.1341%2020.998%2016.4731%2020.998%2015.1513C20.998%2014.5728%2020.998%2014.2836%2020.9536%2014.0078C20.8694%2013.4866%2020.6678%2012.9923%2020.3647%2012.5633C20.2043%2012.3363%2020.0032%2012.1317%2019.6005%2011.7227Z%22%20fill%3D%22white%22%20fill-opacity%3D%220.7%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M16.9392%204H20.0838C20.4038%204%2020.5638%204%2020.686%204.06228C20.7935%204.11707%2020.8809%204.20448%2020.9358%204.31201C20.998%204.43424%2020.998%204.59425%2020.998%204.91427V8.05883C20.998%208.5781%2020.998%208.83773%2020.8953%208.95796C20.8062%209.06227%2020.6726%209.11764%2020.5358%209.10687C20.3782%209.09447%2020.1945%208.91089%2019.8273%208.5437L18.7448%207.46112L15.3089%2010.8969C14.8774%2011.3285%2014.5172%2011.6887%2014.1989%2011.9589C13.8668%2012.2408%2013.5244%2012.4748%2013.1129%2012.6085C12.4817%2012.8136%2011.8018%2012.8136%2011.1705%2012.6085C10.7591%2012.4748%2010.4167%2012.2408%2010.0846%2011.9589C9.76612%2011.6885%209.4057%2011.3281%208.97389%2010.8963L6.39279%208.31516C6.05805%207.98041%206.05805%207.4377%206.39278%207.10297C6.72752%206.76823%207.27023%206.76823%207.60496%207.10296L10.1618%209.65984C10.6244%2010.1224%2010.9354%2010.4324%2011.194%2010.652C11.445%2010.8651%2011.5898%2010.9422%2011.7003%2010.9781C11.9872%2011.0713%2012.2963%2011.0713%2012.5832%2010.9781C12.6937%2010.9422%2012.8385%2010.8651%2013.0894%2010.652C13.3481%2010.4324%2013.6591%2010.1224%2014.1216%209.65984L17.5326%206.24893L16.4543%205.17059C16.0872%204.80346%2015.9035%204.61981%2015.8911%204.4622C15.8803%204.32543%2015.9357%204.19178%2016.04%204.10268C16.1602%204%2016.4199%204%2016.9392%204Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E%0A");
                background-repeat: no-repeat;
                background-position: center;
                background-size: 20px 20px;
            }
        </style>';
        echo wp_kses($admin_css, array('style' => array()));
    }

    public function my_plugin_menu()
    {
        add_menu_page(
            VIRFICE_APP_NAME . ': Email Customizer for WooCommerce',
            VIRFICE_APP_NAME,
            'manage_woocommerce',
            VIRFICE_APP_PREFIX,
            [$this, 'my_plugin_page'],
            'dashicons-' . VIRFICE_APP_PREFIX,
            '58.00' // Position (this places it near WooCommerce which is at position 55)
        );
        add_submenu_page(VIRFICE_APP_PREFIX, VIRFICE_APP_NAME . ' - Dashboard', 'Dashboard', 'manage_woocommerce', 'virfice&menu=dashboard', [$this, 'my_plugin_page']);

        if (!Utils::is_woocommerce_activated()) {
            return;
        }
        // Emails
        add_submenu_page(VIRFICE_APP_PREFIX, VIRFICE_APP_NAME . ' - Emails', 'Emails', 'manage_woocommerce', 'virfice&menu=woo-email-list', [$this, 'my_plugin_page']);
        add_submenu_page(VIRFICE_APP_PREFIX, VIRFICE_APP_NAME . ' - Settings', 'Settings', 'manage_woocommerce', 'virfice&menu=settings', [$this, 'my_plugin_page']);
        // add_submenu_page(VIRFICE_APP_PREFIX, VIRFICE_APP_NAME . ' - Builder', 'Builder', 'manage_woocommerce', 'virfice&menu=builder', [$this, 'my_plugin_page']);
    }

    /**
     * Adds a custom menu to the WordPress admin sidebar.
     * The menu links to the plugin's settings page.
     *
     * @return void
     */
    public function my_plugin_page()
    {
        // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        echo wp_kses_post('<div id="' . VIRFICE_APP_PREFIX . '-dashboard"></div>');
    }

    /**
     * Enqueues custom scripts and styles for the plugin's admin page.
     * This function ensures that scripts are only loaded when needed, to avoid unnecessary resource usage.
     *
     * @param string $hook The current admin page hook.
     * @return void
     */
    public function my_plugin_enqueue_script($hook)
    {
        // Enqueue the script only on your plugin's settings page
        if ('toplevel_page_' . VIRFICE_APP_PREFIX === $hook) {
            // Replace 'my-script' with a unique handle for your script
            wp_enqueue_script(VIRFICE_APP_PREFIX, plugins_url('../assets/js/virfice.min.js', __FILE__), array(), VIRFICE_VERISION, true);
            wp_enqueue_style(VIRFICE_APP_PREFIX, plugins_url('../assets/css/virfice-style.min.css', __FILE__), array(), VIRFICE_VERISION);

            wp_localize_script(VIRFICE_APP_PREFIX, VIRFICE_APP_PREFIX, array(
                'ajaxurl' => admin_url('admin-ajax.php'),
                'restBase' => rest_url(),
                'adminUrl' => Utils::get_current_admin_url(),
                'nonce' => wp_create_nonce('wp_rest'),
                'pluginBase' => VIRFICE_PLUGIN_BASE,
                'assetsBase' => VIRFICE_STATIC_FILES_BASE,
                'isWooActive' => Utils::is_woocommerce_activated(),
                'wooPluginSearchUrl' => esc_url(admin_url('plugin-install.php?s=woocommerce&tab=search&type=term'))
            ));

            wp_enqueue_media();
        }
    }
}
