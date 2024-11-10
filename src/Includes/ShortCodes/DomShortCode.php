<?php

namespace Virfice\Includes\ShortCodes;

use Symfony\Component\DomCrawler\Crawler;

// Security check to ensure this file is not accessed directly
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * templates crude class
 */
class DomShortCode
{

    public static function run($template, $short_codes)
    {
        $template = new Crawler($template);
        // Iterate over the short_codes array
        foreach ($short_codes as $key => $value) {
            $template = self::set_inner_html_using_short_code_data_attribute($template, $key, $value);
        }

        $template = $template->html();
        return $template;
    }

    public static function run_items($parent_selector, $item_selector, $template, $short_codes_arr)
    {
        $template = new Crawler($template); // Initialize the Crawler with the HTML template
        // Find the parent element within which item rows will be placed
        $template->filter($parent_selector)->each(function (Crawler $parentNode) use ($item_selector, $short_codes_arr) {
            $parent = $parentNode->getNode(0); // Access the parent DOMElement
            $itemTemplate = null;

            // Create a Crawler around the parent element to use the filter() method
            $parentCrawler = new Crawler($parent);
            $parentCrawler->filter($item_selector)->each(function (Crawler $itemNode) use (&$itemTemplate) {
                $itemTemplate = $itemNode->getNode(0); // Access the item template DOMElement
            });

            if ($itemTemplate) {
                // Clear existing items within the parent
                while ($parent->hasChildNodes()) {
                    $parent->removeChild($parent->firstChild);
                }

                // Generate and add each modified item row based on $short_codes
                foreach ($short_codes_arr as $short_codes) {
                    $currentItem = $itemTemplate->cloneNode(true); // Clone the template for each item

                    // Replace each shortcode in the cloned item
                    foreach ($short_codes as $key => $value) {
                        self::set_inner_html_using_short_code_data_attribute(new Crawler($currentItem), $key, $value);
                    }

                    // Append the modified item row to the parent
                    $parent->appendChild($parent->ownerDocument->importNode($currentItem, true));
                }
            }
        });

        // Return the modified HTML as a string
        return $template->html();
    }


    private static function getInnerHtml(\DOMElement $element)
    {
        $innerHTML = '';
        foreach ($element->childNodes as $child) {
            $innerHTML .= $element->ownerDocument->saveHTML($child);
        }
        return $innerHTML;
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

    public static function set_inner_html_using_short_code_data_attribute($template, $short_code, $value)
    {
        // Use DomCrawler's filter method to locate the element by custom attribute
        $template->filter('[virfice-short_code="' . $short_code . '"]')
            ->each(function (Crawler $node) use ($value) {
                $element = $node->getNode(0); // Access the underlying DOMElement

                // Parse $value as HTML, wrapping it to ensure it's valid HTML
                $doc = new \DOMDocument();
                $doc->loadHTML('<div>' . $value . '</div>'); // Wrap in <div> to avoid HTML parsing issues

                // Import each child node from $value into the main document
                $fragment = $element->ownerDocument->createDocumentFragment();
                foreach ($doc->getElementsByTagName('div')->item(0)->childNodes as $child) {
                    $fragment->appendChild($element->ownerDocument->importNode($child, true));
                }

                // Clear existing content and append the new fragment
                while ($element->hasChildNodes()) {
                    $element->removeChild($element->firstChild);
                }
                $element->appendChild($fragment);
            });

        return $template;
    }
}
