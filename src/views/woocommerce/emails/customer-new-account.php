<?php
// phpcs:ignoreFile
use Virfice\Includes\ShortCodes\ShortCodes;
use Virfice\Utils;

if (! defined('ABSPATH')) {
	exit;
}
$email_id = 'customer_new_account';

echo Utils::get_woo_email_preview_text($email_id);

$template = Utils::get_template_content_from_woo_email_id($email_id);
$short_codes = new ShortCodes($template, [
	'type' => 'woo_email_customer_new_account',
	'show_set_password' => ('yes' === get_option('woocommerce_registration_generate_password') && $password_generated && $set_password_url),
	'set_password_url' => esc_attr($set_password_url),
	'user_login' => esc_html($user_login),
]);
$template = $short_codes->do_short_code();
$template = Utils::wrap_template_with_html_tag($template);

echo $template;
