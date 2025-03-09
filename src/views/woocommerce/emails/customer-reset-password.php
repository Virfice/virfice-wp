<?php
// phpcs:ignoreFile
use Virfice\Includes\ShortCodes\ShortCodes;
use Virfice\Utils;

if (! defined('ABSPATH')) {
	exit;
}
$email_id = 'customer_reset_password';

$reset_pass_url = esc_url_raw(add_query_arg(array('key' => $reset_key, 'id' => $user_id, 'login' => rawurlencode($user_login)), wc_get_endpoint_url('lost-password', '', wc_get_page_permalink('myaccount'))));

echo Utils::get_woo_email_preview_text($email_id);

$template = Utils::get_template_content_from_woo_email_id($email_id);
$short_codes = new ShortCodes($template, [
	'type' => 'woo_email_customer_reset_password',
	'show_reset_password' => true,
	'reset_password_url' => $reset_pass_url,
	'user_login' => esc_html($user_login),
]);
$template = $short_codes->do_short_code();
$template = Utils::wrap_template_with_html_tag($template);

echo $template;
