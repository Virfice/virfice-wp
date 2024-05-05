<?php
namespace Virfice;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

class Utils{

    public static function get_email_object_from_email_id($email_id){
        $emails = WC()->mailer()->emails;
        foreach ($emails as $key => $email) {
            if($email->id === $email_id){
                return ['object'=>$email, 'key'=>$key];
            }
        }
        return null;
    }

    public static function get_current_admin_url(){
        return admin_url(sprintf(basename($_SERVER['REQUEST_URI'])));
    }

    public static function is_woocommerce_activated() {
        $active_plugins = apply_filters('active_plugins', get_option('active_plugins'));
        return in_array('woocommerce/woocommerce.php', $active_plugins);
    }
    
}


?>