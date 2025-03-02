<?php

namespace Virfice\Includes\ShortCodes;

// Security check to ensure this file is not accessed directly
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class WooEmailUtilityShortCodeReplacer
{
    private $info;
    public function replace_short_codes($content, $info)
    {
        $this->info = $info;

        if (isset($this->info['show_set_password'], $this->info['set_password_url'])) {
            if (!$this->info['show_set_password']) {
                //remove password set div;
                $content = $this->hide_password_set_wrapper($content);
            } else {
                $content = $this->set_password_set_url($content, $this->info['set_password_url']);
            }
        }

        if (isset($this->info['show_reset_password'], $this->info['reset_password_url'])) {
            if (!$this->info['show_reset_password']) {
                //remove password reset div;
                $content = $this->hide_password_reset_wrapper($content);
            } else {
                $content = $this->reset_password_set_url($content, $this->info['reset_password_url']);
            }
        }


        $short_codes = $this->get_short_codes();

        // Replace simple short_codes
        foreach ($short_codes as $short_code => $value) {
            $content = str_replace("{" . $short_code . "}", $value, $content);
        }
        $content = $this->replace_dom_short_code($content, $short_codes);

        return $content;
    }

    private function set_password_set_url($content, $set_password_url)
    {
        $content = DomShortCode::set_attribute_value_using_shortcode($content, 'set_password_link', 'href', $set_password_url);
        return $content;
    }

    private function reset_password_set_url($content, $reset_password_url)
    {
        $content = DomShortCode::set_attribute_value_using_shortcode($content, 'reset_password_link', 'href', $reset_password_url);
        return $content;
    }

    private function hide_password_set_wrapper($content)
    {
        $content = DomShortCode::remove_element_using_my_selector($content, 'set_password_wrapper');
        return $content;
    }

    private function hide_password_reset_wrapper($content)
    {
        $content = DomShortCode::remove_element_using_my_selector($content, 'reset_password_wrapper');
        return $content;
    }

    private function replace_dom_short_code($content, $short_codes)
    {
        $content = DomShortCode::run($content, $short_codes);
        return $content;
    }

    private function get_short_codes()
    {
        // Define the short_codes and their replacements
        $short_codes = [
            'user_login' => $this->info['user_login'],
            'set_password_url' => isset($this->info['set_password_url']) ? $this->info['set_password_url'] : '',
            'reset_password_url' => isset($this->info['reset_password_url']) ? $this->info['reset_password_url'] : '',
        ];

        $short_codes = array_merge($short_codes, ShortCodes::common_short_codes());

        return $short_codes;
    }
}
