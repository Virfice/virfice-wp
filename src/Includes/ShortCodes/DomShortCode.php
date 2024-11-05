<?php

namespace Virfice\Includes\ShortCodes;

use Symfony\Component\DomCrawler\Crawler;
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

    public static function run($string, $short_codes)
    {
        // Convert the HTML string to a DOM object using DomCrawler
        $template = new Crawler($string);

        // Iterate over the short_codes array
        foreach ($short_codes as $key => $value) {
            // Check if the current key matches 'woocommerce_email_order_details'
            if ($key === 'woocommerce_email_order_details') {

                $template = self::set_inner_html_using_ele_type($template, 'woocommerce_email_order_details', $value);
            }
        }

        // Return the modified HTML
        $string = $template->html();
        return $string;
    }

    public static function remove_script_tag($crawler)
    {
        $crawler->filter('script')->each(function (Crawler $node) {
            // Remove each <script> node
            $node->getNode(0)->parentNode->removeChild($node->getNode(0));
        });
        return $crawler;
    }

    public static function remove_attribute($crawler, $attr_name)
    {
        $crawler->filter('*[' . $attr_name . ']')->each(function (Crawler $node) use ($attr_name) {
            // Access the underlying DOMElement and remove the specified attribute
            $domNode = $node->getNode(0); // Get the DOM element
            if ($domNode && $domNode->hasAttribute($attr_name)) {
                $domNode->removeAttribute($attr_name);
            }
        });

        return $crawler;
    }

    private static function set_inner_html_using_ele_type($template, $ele_type, $value)
    {
        Utils::LOG('____P2F2____');
        Utils::LOG($value);
        // Use DomCrawler's filter method to locate the element by custom attribute
        $template->filter('[virfice-ele_type="' . $ele_type . '"]')
            ->each(function (Crawler $node) use ($value) {
                $element = $node->getNode(0); // Access the underlying DOMElement
                // Import the new HTML content as a DOM fragment
                $fragment = $element->ownerDocument->createDocumentFragment();
                $fragment->appendXML($value); // Insert raw HTML content


                // Remove existing child nodes, then append the fragment
                while ($element->hasChildNodes()) {
                    $element->removeChild($element->firstChild);
                }
                $element->appendChild($fragment);
            });
        return $template;
    }
}
