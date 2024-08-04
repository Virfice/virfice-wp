<?php

use Virfice\API\Settings;

$settings = Settings::get_email_settings();
if (!isset($settings['virfice_address'])) {
    return;
}
$title = isset($settings['virfice_store_name']) ? $settings['virfice_store_name'] : '';
?>
<div>
    <p style="text-align: center;margin-top: 8px;margin-bottom: 0; color: #616161;"><strong><?php echo esc_html($title); ?></strong></p>

    <table style="width: 100%; text-align: center;">
        <tr>
            <td><?php echo esc_html($settings['virfice_address']); ?>, <?php echo esc_html($settings['virfice_city']); ?>, <?php echo esc_html($settings['virfice_country']); ?></td>
        </tr>
    </table>

</div>