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
    }

    public function virfice_show_congratulation_message() {
        // Check if it's the first installation
        if (get_option('virfice_first_install')) {
            $url = Utils::get_plugin_home_url();
            ?>
            <div class="notice notice-success is-dismissible">
                <div style="display: flex; gap: 40px; padding: 20px 32px;">
                    <img src="<?php echo VIRFICE_STATIC_FILES_BASE;?>/greeting-bird.jpg" alt="Hello Virfice" style="object-fit: contain;" />
                    <div>
                        <h1 style="color: #1A1A1A;font-family: Roboto; font-size: 32px; font-style: normal; font-weight: 400; line-height: 40px;"><?php _e('Congraaaatulations! 🥳 🎉 our Plugin is Now Active!', 'virfice'); ?></h1>
                        <p style="color: #1A1A1A; font-family: Roboto; font-size: 16px; font-style: normal; font-weight: 400; line-height: 24px;letter-spacing: 0.5px;max-width: 522px;"><?php _e('Say Hello! to your WooCommerce email friend, Virfice. Let your emails speak for your store brand!', 'virfice'); ?></p>
                        <a href="<?php echo $url; ?>" style="width: max-content; display: flex; padding: 6px 12px; justify-content: center; align-items: center; gap: 4px; border-radius: 999px; background: #C8E265; box-shadow: 1.5px 1.5px 0px 0px rgba(0, 0, 0, 0.2); border: 1px solid #949494; color: #303030; cursor: pointer;text-decoration: none;font-size: 12px; font-family: Roboto, sans-serif; font-weight: 600; letter-spacing: 0.5px; line-height: 16px;"><?php echo _e('Explore Virfice!', 'virfice'); ?></a>
                    </div>
                </div>
            </div>
            <?php
            // Clear the flag so the message is only displayed once
            // delete_option('virfice_first_install');
        }
    }

    
}
