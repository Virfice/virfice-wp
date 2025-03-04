<?php

namespace Virfice\Includes\ShortCodes;

use Virfice\API\Settings;

// Security check to ensure this file is not accessed directly
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * templates crude class
 */
class ShortCodes
{
    private $string = '';
    private $context = ''; //array('type'=>'woo_email', ....);
    public function __construct($string, $context)
    {
        $this->string = $string;
        $this->context = $context;
    }

    public function do_short_code()
    {
        if ($this->context['type'] === 'woo_email') {
            $order_id = $this->context['order_id'];
            $woo_replacer = new WooEmailShortCodeReplacer($order_id);
            $this->string = $woo_replacer->replace_short_codes($this->string);
        } else if ($this->context['type'] === 'woo_email_customer_new_account') {
            $info = [
                'show_set_password' => $this->context['show_set_password'],
                'set_password_url' => $this->context['set_password_url'],
                'user_login' => $this->context['user_login'],
            ];

            $woo_replacer = new WooEmailUtilityShortCodeReplacer();
            $this->string = $woo_replacer->replace_short_codes($this->string, $info);
        } else if ($this->context['type'] === 'woo_email_customer_reset_password') {
            $info = [
                'show_reset_password' => $this->context['show_reset_password'],
                'reset_password_url' => $this->context['reset_password_url'],
                'user_login' => $this->context['user_login'],
            ];

            $woo_replacer = new WooEmailUtilityShortCodeReplacer();
            $this->string = $woo_replacer->replace_short_codes($this->string, $info);
        }

        return $this->string;
    }

    public static function common_short_codes()
    {
        return [
            'site_title' => get_bloginfo('name'),
            'store_url' => get_home_url(),
            'store_phone' => get_option('woocommerce_store_phone'),
            'store_address' => self::get_store_address(),
        ];
    }

    public static function get_store_address()
    {
        $settings = Settings::get_email_settings();

        if (!isset($settings['virfice_address']) || empty($settings['virfice_address'])) {
            return '';
        }
        $address_parts = array_filter([
            $settings['virfice_address'] ?? '',
            $settings['virfice_city'] ?? '',
            $settings['virfice_country'] ?? ''
        ]);

        $address = implode(', ', $address_parts);
        return $address;
    }
}
