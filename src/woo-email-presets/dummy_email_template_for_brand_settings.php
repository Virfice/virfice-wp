<?php

use Virfice\API\Settings;
use Virfice\Utils;

$social_icons_html = Utils::get_social_icons_html('');
$store_address_html = Utils::get_store_address_html();
$settings = Settings::get_email_settings();
?>
<div virfice-ele_type="section" virfice-settings_status="disabled" virfice-id="m4e94we0e01ydsfn">
    <div virfice-ele_type="brand-settings" style="text-align:center;" virfice-id="m4e94we0e0192jpyn" class="">
        <div style="padding-top: 26px;padding-bottom: 26px;" class="virfice-email-header">
            <img src="<?php echo VIRFICE_STATIC_FILES_BASE; ?>/virfice.png" style="width: 90px;margin:auto;">
        </div>

        <table>
            <tbody>
                <tr>
                    <td style="width: 50%;">
                        <img src="<?php echo VIRFICE_STATIC_FILES_BASE; ?>/demo-image.jpg">
                    </td>
                    <td style="width: 50%;padding: 16px;text-align: center;">
                        <h1
                            style="text-align: center;font-size: 20px; font-style: normal; line-height: 26px;letter-spacing: 0.4px;">
                            See it, make it<br>try it, do it</h1>
                        <p
                            style=" text-align: center; font-size: 12px; font-style: normal; font-weight: 400; line-height: normal;">
                            A creative who loves to create<br>
                            online spaces powered by<br>
                            WordPress</p>
                        <a
                            style="border-radius: 36px; padding: 8px 16px;background: #014B1E; margin-top: 16px;">Explore</a>
                    </td>
                </tr>
            </tbody>
        </table>

        <div style="padding: 32px; display: flex; gap: 60px; background: white;">
            <div>
                <img src="<?php echo VIRFICE_STATIC_FILES_BASE; ?>/demo-image.jpg"
                    style="border-radius: 999px 999px 0px 0px; height: 238px;">
                <p>Orchid Drop</p>
                <p><strong>$30.00</strong></p>
            </div>

            <div>
                <img src="<?php echo VIRFICE_STATIC_FILES_BASE; ?>/demo-image.jpg"
                    style="border-radius: 999px 999px 0px 0px; height: 238px;">
                <p>Orchid Drop</p>
                <p><strong>$30.00</strong></p>
            </div>
        </div>

        <div style="padding: 24px; display: flex; gap: 60px;">
            <div style="width: 150px;display: flex; flex-direction:column; justify-content:space-between;">
                <h1 style="font-size: 24px; font-style: normal; line-height: normal;">Free Worldwide Shipping</h1>
                <a style="border-radius: 36px; padding: 8px 16px;background: #014B1E;">Explore</a>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
                <img src="<?php echo VIRFICE_STATIC_FILES_BASE; ?>/demo-image.jpg" style="width: 100%; height: 180px;">
                <img src="<?php echo VIRFICE_STATIC_FILES_BASE; ?>/demo-image.jpg" style="width: 100%; height: 180px;">
                <img src="<?php echo VIRFICE_STATIC_FILES_BASE; ?>/demo-image.jpg" style="width: 100%; height: 180px;">
            </div>
        </div>


        <div style="padding-top: 26px;padding-bottom: 26px;" class="virfice-email-footer">
            <?php echo $social_icons_html; ?>
            <p><?php echo $settings['virfice_website_url']; ?></p>
            <img src="<?php echo VIRFICE_STATIC_FILES_BASE; ?>/virfice.png" style="width: 90px;margin:auto;">
            <?php echo $store_address_html; ?>
        </div>

    </div>
</div>