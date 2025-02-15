<div virfice-ele_type="section" virfice-settings_status="disabled"
    style="padding-top: 0px; padding-bottom: 0px; text-align: center;background-color: #FFC900;"
    virfice-id="m58e705klg2ri1fb7" class="">
    <div virfice-title="Text" virfice-ele_type="text" virfice-selector="" contenteditable=""
        virfice-id="m58e705kkmilhca7o" class=""
        style="text-align: left; padding: 36px 48px 36px 48px;  color: #000000;font-size: 30px;">
        Thank you for your order</div>
</div>


<div virfice-ele_type="section" virfice-settings_status="disabled"
    style="padding: 36px 48px 36px 48px; text-align:left;" virfice-id="m58eqnj78lwhy96tx" class="">
    <div virfice-title="Order Table" virfice-ele_type="woocommerce_email_order_details" style="text-align: left;"
        virfice-id="m58eqnj8nye46vhyg" class="">
        <div virfice-title="Text" virfice-ele_type="text" virfice-selector="" contenteditable=""
            virfice-id="m58e705kkmilhca7" class="" style="text-align: left;font-size: 14px;margin-bottom:8px;">
            Just to let you know - we've recieved your order #{order_number}, and it's now being processed.</div>

        <div virfice-selector="order_details_title" style="font-size: 18px;text-decoration: underline;">
            Order #{order_number}
        </div>

        <div virfice-title="Text" virfice-ele_type="text" virfice-selector="" contenteditable=""
            virfice-id="m58e705kkmilhca" class="" style="text-align: left;font-size: 14px;">
            {order_date}</div>
        <?php include VIRFICE_PLUGIN_ROOT . "/src/woo-email-presets/Reusable/order-details.php"; ?>
    </div>
</div>


<div virfice-ele_type="section" virfice-settings_status="disabled" style="padding: 0px 40px 40px; text-align: center;"
    virfice-id="m6wm9uns1emtyg680">
    <div virfice-title="Divider" virfice-ele_type="divider" style="border-bottom: 1px solid #E5E5E5; width: 100%;"
        virfice-id="m6wm9unsefl7jhvte"></div>
</div>

<div virfice-ele_type="section" virfice-settings_status="disabled" style="padding: 0px 40px 36px 40px; text-align:left;"
    virfice-id="m58eqnj78lwhy96t" class="">
    <?php include VIRFICE_PLUGIN_ROOT . "/src/woo-email-presets/Reusable/shipping-details.php"; ?>
</div>


<div virfice-ele_type="section" virfice-settings_status="disabled" virfice-id="m58e705klg2ri1fb" class="">
    <div virfice-title="Text" virfice-ele_type="text" contenteditable="" virfice-id="m58e705kkmilhc" class=""
        style="text-align: left; padding: 0px 48px 36px 48px; font-size: 14px;">
        Thanks for reading.</div>
</div>