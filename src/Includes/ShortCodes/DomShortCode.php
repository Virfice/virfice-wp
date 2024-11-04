<?php

namespace Virfice\Includes\ShortCodes;

use Virfice\Utils;

// Security check to ensure this file is not accessed directly
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * templates crude class
 */
class DomShortCode
{

    public static function run($string, $args)
    {
        // Convert the HTML string to a DOM object using simple_html_dom.php
        $template = Utils::string_to_dom($string);
        // Iterate over the args array
        foreach ($args as $key => $value) {
            // Check if the current key matches 'woocommerce_email_order_details'
            if ($key === 'woocommerce_email_order_details') {
                // Use simple_html_dom's find method to locate the element by attribute
                $order_details = $template->find('div', 0);

                echo "<pre>";
                var_dump($order_details);
                die;
                // Check if the element exists
                if ($order_details) {
                    // Replace the inner HTML of the element with $value
                    $order_details->innertext = $value;
                }
            }
        }

        // Return the modified HTML as a string
        return $template->save();
    }
}
