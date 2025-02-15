<?php

use Virfice\Utils;

$brand_settings = Utils::get_virfice_brand_settings();
$store_logo = $brand_settings['logo'];
$store_name = $brand_settings['store_name'];
?>
<div virfice-ele_type="section" virfice-settings_status="disabled" style="padding: 26px 0px; text-align: center;"
    virfice-id="m75577s6wwes9m6fa">
    <a virfice-ele_type="image" virfice-title="Image" style="width:100%;" virfice-id="m75577s6yg6hurgwm"><img
            virfice-my_selector="image" virfice-short_code="store_logo" src="<?php echo $store_logo; ?>"
            style="margin-left: auto; margin-right: auto;"></a>
</div>
<div virfice-ele_type="section" virfice-settings_status="disabled"
    style="padding-top: 16px;padding-bottom: 16px; padding-left: 0px; padding-right: 0px; text-align:center;"
    virfice-id="m75r94wzossfd1c8v">
    <a virfice-ele_type="image" virfice-title="Image" style="width:100%;" virfice-id="m75r94wzd4iua9muc"><img
            virfice-my_selector="image"
            src="<?php echo VIRFICE_STATIC_FILES_BASE; ?>/woo-email-presets/set-new-password.png"
            style="margin-left: auto;margin-right: auto;width: 128px;"></a>
</div>
<div virfice-ele_type="section" virfice-settings_status="disabled" style="padding: 16px 50px; text-align: center;"
    virfice-id="m754ugfhaeep831n9">
    <p virfice-title="Text" virfice-ele_type="text" contenteditable="" virfice-id="m754ugfhq0fyve1aq"
        style="text-align: left;">Hi {user_login},</p>
</div>
<div virfice-ele_type="section" virfice-settings_status="disabled" style="padding: 16px 50px; text-align: center;"
    virfice-id="m754x4ua1cwc2gdif">
    <p virfice-title="Text" virfice-ele_type="text" contenteditable="" virfice-id="m754x4uatqlm5qc7a"
        style="text-align: left;">Someone has requested a new password for the following
        account on {store_url}:</p>
</div>
<div virfice-ele_type="section" virfice-settings_status="disabled" style="padding: 16px 50px; text-align: center;"
    virfice-id="m7551yx23zymfn1xs">
    <p virfice-title="Text" virfice-ele_type="text" contenteditable="" virfice-id="m7551yx2em66r5hcx"
        style="text-align: left;">Username: {user_login}</p>
</div>

<div virfice-ele_type="section" virfice-settings_status="disabled" style="padding: 16px 50px; text-align: center;"
    virfice-id="m7551yx23zymfn1x">
    <p virfice-title="Text" virfice-ele_type="text" contenteditable="" virfice-id="m7551yx2em66r"
        style="text-align: left;">If you didn't make this request, just ignore this
        email. If you'd like to proceed:</p>
</div>
<div virfice-ele_type="section" virfice-settings_status="disabled" style="padding: 16px 50px; text-align: center;"
    virfice-id="m754xqamavmayjxvn" virfice-my_selector="set_password_wrapper">
    <a virfice-title="Button" virfice-ele_type="link"
        style="display: inline-flex;gap: 8px;border-radius: 4px;padding: 10px 16px;font-weight: 600;" contenteditable=""
        virfice-id="m754xqambd7n4a38e" virfice-short_code="set_password_link">Click here to
        reset your password</a>
</div>

<div virfice-ele_type="section" virfice-settings_status="disabled" style="padding: 16px 50px 64px; text-align: center;"
    virfice-id="m7551yx23">
    <p virfice-title="Text" virfice-ele_type="text" contenteditable="" virfice-id="m7551yx2em"
        style="text-align: left;">Thanks for reading.</p>
</div>