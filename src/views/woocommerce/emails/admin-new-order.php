<?php

use Virfice\Includes\ShortCodes\ShortCodes;
use Virfice\Utils;

if (! defined('ABSPATH')) {
    exit;
}
$email_id = 'new_order';

$template = Utils::get_template_content_from_woo_email_id($email_id);

/**
 * DO NOT REMOVE START
 */
// // Start output buffering
// ob_start();
// // Execute the action, which will output content to the buffer
// do_action('woocommerce_email_order_details', $order, $sent_to_admin, $plain_text, $email);
// // Get the contents of the buffer and save it to a string
// $woocommerce_email_order_details = ob_get_clean();
// $v = new Crawler($woocommerce_email_order_details);
// $v = DomShortCode::remove_script_tag($v);
// $v = DomShortCode::remove_attribute($v, 'style');
// $woocommerce_email_order_details = $v->html();

// $short_codes = [
//     'woocommerce_email_order_details' => $woocommerce_email_order_details
// ];

// //TODO: do shortcodes
// $template = DomShortCode::run($template, $short_codes);
/**
 * DO NOT REMOVE END
 */

$short_codes = new ShortCodes($template, ['type' => 'woo_email', 'order_id' => $order->get_id()]);
$template = $short_codes->do_short_code();
echo Utils::get_template_common_global_css();
?>
<div class="virfice-template-wrapper">
    <?php
    echo $template;
    ?>
</div>