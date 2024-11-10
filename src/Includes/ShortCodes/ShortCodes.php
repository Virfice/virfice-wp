<?php

namespace Virfice\Includes\ShortCodes;

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
        }

        return $this->string;
    }
}
