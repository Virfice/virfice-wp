<?php

namespace Virfice;

// Security check to ensure this file is not accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class AdminNotice
 * Handles the WordPress AdminNotice elements for the Virfice plugin.
 * This class manages menu creation, script enqueueing, and other admin-related tasks.
 */
class AdminNotice
{
    /**
     * AdminNotice constructor.
     * Registers WordPress hooks for the plugin's admin-related features.
     */
    public function __construct()
    {
        add_action('admin_notices', [$this, 'virfice_show_congratulation_message']);
        add_action('admin_footer', [$this, 'virfice_add_inline_script']);
        add_action('wp_ajax_virfice_dismiss_notice', [$this, 'virfice_dismiss_notice']);
    }

    public function virfice_show_congratulation_message()
    {
        // Check if it's the first installation
        if (get_option('virfice_first_install')) {
            $url = Utils::get_plugin_home_url();
?>
            <div class="notice notice-success is-dismissible virfice-notice">
                <div style="display: flex; gap: 40px; padding: 20px 32px;">
                    <img src="<?php echo esc_url(VIRFICE_STATIC_FILES_BASE); ?>/greeting-bird.webp" alt="Hello Virfice"
                        style="object-fit: contain;" />
                    <div>
                        <h1
                            style="color: #1A1A1A;font-family: Roboto; font-size: 32px; font-style: normal; font-weight: 400; line-height: 40px;">
                            Congraaaatulations! 🥳 🎉 <strong>Virfice</strong> is now active!</h1>
                        <p
                            style="color: #1A1A1A; font-family: Roboto; font-size: 16px; font-style: normal; font-weight: 400; line-height: 24px;letter-spacing: 0.5px;max-width: 522px;">
                            Say hello to your WooCommerce email friend. Let your emails speak for your store's brand!</p>
                        <div style="display: flex; align-items: center; gap: 16px;">
                            <a href="<?php echo esc_url($url); ?>"
                                style="width: max-content; display: flex; padding: 6px 12px; justify-content: center; align-items: center; gap: 4px; border-radius: 999px; background: #C8E265; box-shadow: 1.5px 1.5px 0px 0px rgba(0, 0, 0, 0.2); border: 1px solid #949494; color: #303030; cursor: pointer;text-decoration: none;font-size: 12px; font-family: Roboto, sans-serif; font-weight: 600; letter-spacing: 0.5px; line-height: 16px;"><?php echo esc_html(_e('Try Virfice now!', 'virfice')); ?></a>
                            <a href="https://virfice.com/docs/" target="_blank"
                                style="text-decoration: none; display: flex; justify-content: center; align-items: center; gap: 4px;"><svg
                                    width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6 4.125C6 3.72718 6.15804 3.34564 6.43934 3.06434C6.72064 2.78304 7.10218 2.625 7.5 2.625H10.875V9.375H7.5C7.10218 9.375 6.72064 9.53304 6.43934 9.81434C6.15804 10.0956 6 10.4772 6 10.875"
                                        stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M1.125 9.375H4.5C4.89782 9.375 5.27936 9.53304 5.56066 9.81434C5.84196 10.0956 6 10.4772 6 10.875V4.125C6 3.72718 5.84196 3.34564 5.56066 3.06434C5.27936 2.78304 4.89782 2.625 4.5 2.625H1.125V9.375Z"
                                        stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Explore guide!</a>
                        </div>
                    </div>
                </div>
            </div>
        <?php
        }
    }

    public function virfice_add_inline_script()
    {
        if (get_option('virfice_first_install')) {
        ?>
            <script type="text/javascript">
                jQuery(document).ready(function($) {
                    $('.virfice-notice').on('click', '.notice-dismiss', function() {
                        $.ajax({
                            url: '<?php echo esc_url(admin_url('admin-ajax.php')); ?>',
                            type: 'POST',
                            data: {
                                action: 'virfice_dismiss_notice',
                                nonce: '<?php echo esc_html(wp_create_nonce('virfice_dismiss_notice')); ?>'
                            },
                            success: function(response) {
                                if (response.success) {
                                    $('.virfice-notice').remove();
                                } else {
                                    console.log('Error:', response.data);
                                }
                            }
                        });
                    });
                });
            </script>
<?php
        }
    }

    public function virfice_dismiss_notice()
    {
        check_ajax_referer('virfice_dismiss_notice', 'nonce');
        if (current_user_can('manage_options')) {
            delete_option('virfice_first_install');
            wp_send_json_success();
        } else {
            wp_send_json_error('Permission denied');
        }
    }
}
