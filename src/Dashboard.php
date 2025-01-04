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
        add_action( 'admin_print_styles', [$this, 'my_plugin_admin_inline_css'] );

        // Add a custom rewrite rule
        // add_action('init', [$this, 'rewrite_route']);
        add_action('admin_head', [$this, 'my_plugin_highlight_submenu']);
        add_action('admin_footer', [$this, 'my_plugin_custom_script']);

    }

    

    public function my_plugin_highlight_submenu() {
        global $submenu_file;

        if (isset($_GET['menu'])) {
            switch ($_GET['menu']) {
                case 'dashboard':{
                    $submenu_file = 'virfice&menu=dashboard';
                    break;
                }
                case 'woo-email-edit':
                case 'woo-email-list':{
                    $submenu_file = 'virfice&menu=woo-email-list';
                    break;
                }
                case 'settings':{
                    $submenu_file = 'virfice&menu=settings';
                    break;
                }
            }
        } else {
            // Default to dashboard if no menu parameter is set
            $submenu_file = 'virfice&menu=dashboard';
        }
    }

    public function my_plugin_custom_script() {
        ?>
<script type="text/javascript">
(function($) {
    var currentUrl = window.location.href;

    $('#toplevel_page_<?php echo VIRFICE_APP_PREFIX; ?> .wp-submenu .wp-first-item').remove();
    $('#toplevel_page_<?php echo VIRFICE_APP_PREFIX; ?> .wp-submenu a').each(function() {
        if (currentUrl.indexOf($(this).attr('href')) !== -1) {
            $(this).parent().addClass('current');
            $(this).closest('.wp-has-submenu').addClass('current wp-menu-open');
        }
    });
})(jQuery);
</script>
<?php
    }

    // /**
    //  * Adds a custom rewrite rule to map a specific URL structure to the plugin's admin page.
    //  * This can be used to create custom routes within the WordPress admin area.
    //  *
    //  * @return void
    //  */
    // public function rewrite_route()
    // {
    //     add_rewrite_rule('^(.+)', 'admin.php?page=' . VIRFICE_APP_PREFIX, 'top');
    // }

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
                background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M8.76472%201.72379C6.91097%202.0079%205.31175%202.82652%204.01029%204.16521C2.84329%205.35462%202.13733%206.67887%201.77234%208.35945C1.67629%208.79284%201.66669%208.99027%201.66669%2010.0063C1.66669%2011.0272%201.67629%2011.2198%201.77234%2011.6628C2.01246%2012.7559%202.43028%2013.7527%203.03058%2014.6677C3.458%2015.3129%204.31764%2016.2182%204.99959%2016.7287C5.90726%2017.4173%207.12228%2017.9566%208.36131%2018.2214C8.79353%2018.3178%209.01445%2018.3322%209.92211%2018.3322C10.8394%2018.337%2011.0507%2018.3226%2011.5213%2018.2263C13.4663%2017.8314%2015.15%2016.858%2016.3843%2015.37L16.6936%2014.9758L16.9758%2014.5773C17.1567%2014.2823%2017.089%2014.3959%2017.1906%2014.2082C17.2901%2014.0245%2017.4253%2013.7883%2017.6167%2013.369C17.784%2013.0027%2017.7829%2013.0163%2017.8874%2012.6917C18.0247%2012.2649%2018.0724%2012.0689%2018.1702%2011.6163C18.2761%2011.1262%2018.3334%2010.0222%2018.3334%209.71272C18.3334%208.96462%2018.1072%208.06145%2018.0247%207.85587C18.0247%207.85587%2018.0143%207.77197%2017.8462%207.28561C17.6829%206.8137%2017.1786%205.7206%2017.1018%205.67244C17.0826%205.66281%2017.0634%205.94692%2017.0634%206.31289C17.049%208.20054%2016.3286%2010.2808%2014.9791%2012.3225C13.9466%2013.8924%2012.8276%2015.0481%2011.5453%2015.8908C10.8778%2016.329%2010.5464%2016.3916%2010.2631%2016.146C9.9029%2015.8282%209.80205%2015.2166%209.80205%2013.3049C9.80205%2012.5489%209.83567%2011.3113%209.87409%2010.5505C9.99415%208.20054%209.84047%206.99187%209.28338%205.8458C9.08648%205.44612%208.68788%204.97902%208.37092%204.77677L8.16441%204.64676L8.39493%204.54082C8.51979%204.48303%208.82235%204.36746%209.05767%204.2856C9.46588%204.14114%209.52831%204.13151%2010.1862%204.13151C10.8346%204.13151%2010.9018%204.14114%2011.1467%204.25671C11.5261%204.43488%2011.747%204.64676%2011.9103%204.98865C12.1553%205.49427%2012.2273%205.99989%2012.2273%207.26153C12.2273%208.53762%2012.1985%208.79765%2011.8335%2010.9453C11.4589%2013.1749%2011.4589%2013.7672%2011.8431%2013.6709C12.0016%2013.6323%2012.4962%2013.1315%2012.9333%2012.5633C13.9322%2011.2776%2014.422%2010.2519%2014.6285%209.04324C14.7726%208.18609%2014.6525%207.81049%2014.0714%207.29043C13.6248%206.89075%2013.4951%206.62108%2013.4951%206.11546C13.4951%205.58576%2013.692%205.11385%2014.1339%204.57934C14.3596%204.30486%2014.9023%203.92926%2015.2288%203.8185L15.4738%203.73664L15.2192%203.51513C14.2779%202.71095%2012.8948%202.06569%2011.5501%201.79121C10.8778%201.66119%209.42266%201.62267%208.76472%201.72379Z%22%20fill%3D%22%23F0F6FC%22%20fill-opacity%3D%220.6%22/%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: center;
                background-size: 20px 20px;
            }
        </style>';
        echo wp_kses($admin_css, array( 'style'=>array() ) );
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
            '58.00'// Position (this places it near WooCommerce which is at position 55)
        );

        // Emails
        add_submenu_page(VIRFICE_APP_PREFIX, VIRFICE_APP_NAME . ' - Dashboard', 'Dashboard', 'manage_woocommerce', 'virfice&menu=dashboard', [$this, 'my_plugin_page']);
        add_submenu_page(VIRFICE_APP_PREFIX, VIRFICE_APP_NAME . ' - Emails', 'Emails', 'manage_woocommerce', 'virfice&menu=woo-email-list', [$this, 'my_plugin_page']);
        add_submenu_page(VIRFICE_APP_PREFIX, VIRFICE_APP_NAME . ' - Settings', 'Settings', 'manage_woocommerce', 'virfice&menu=settings', [$this, 'my_plugin_page']);
    }

    /**
     * Adds a custom menu to the WordPress admin sidebar.
     * The menu links to the plugin's settings page.
     *
     * @return void
     */
    public function my_plugin_page()
    {
        if (!Utils::is_woocommerce_activated()) {
            wp_die(
                // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                '<strong>' . VIRFICE_APP_NAME . ':</strong> WooCommerce is required for this plugin to work. Please install and activate WooCommerce. <br><br> <a href="' . admin_url('plugins.php') . '">Go Back</a>'
            );
        }
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
                'pluginBase' => VIRFICE_PLUGIN_BASE
            ));

            wp_enqueue_media();
        }
    }
}