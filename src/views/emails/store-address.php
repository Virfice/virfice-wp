<?php

use Virfice\API\Settings;

$settings = Settings::get_email_settings();

if (!isset($settings['virfice_address']) || empty($settings['virfice_address'])) {
    return;
}
$title = isset($settings['virfice_store_name']) ? $settings['virfice_store_name'] : '';

$address_parts = array_filter([
    $settings['virfice_address'] ?? '',
    $settings['virfice_city'] ?? '',
    $settings['virfice_country'] ?? ''
]);

$address = implode(', ', $address_parts);
?>
<div>
    <?php if ($title) { ?>
        <p style="text-align: center;margin-top: 8px;margin-bottom: 0;">
            <strong><?php echo esc_html($title); ?></strong>
        </p>
    <?php } ?>
    <table style="width: 100%; text-align: center;">
        <tr>
            <td><?php echo esc_html($address); ?></td>
        </tr>
    </table>

</div>