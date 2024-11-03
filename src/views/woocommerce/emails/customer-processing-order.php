<?php

use Virfice\Utils;

if (! defined('ABSPATH')) {
	exit;
}
$email_id = 'customer_processing_order';
$template = Utils::get_template_content_from_woo_email_id($email_id);

echo Utils::virfice_wp_kses_allowed_html($template);
