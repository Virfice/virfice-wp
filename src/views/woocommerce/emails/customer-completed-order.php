<?php
// phpcs:ignoreFile
use Virfice\Includes\ShortCodes\ShortCodes;
use Virfice\Utils;

if (! defined('ABSPATH')) {
	exit;
}
$email_id = 'customer_completed_order';

echo Utils::get_woo_email_preview_text($email_id);

$template = Utils::get_template_content_from_woo_email_id($email_id);
$short_codes = new ShortCodes($template, ['type' => 'woo_email', 'order_id' => $order->get_id()]);
$template = $short_codes->do_short_code();
$template = Utils::wrap_template_with_html_tag($template);

echo $template;
