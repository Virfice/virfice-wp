<div virfice-ele_type="section" virfice-settings_status="disabled"
    style="padding-top: 0px; padding-bottom: 0px; text-align: center;" virfice-id="m58e705klg2ri1fb7" class="">
    <div virfice-title="Text" virfice-ele_type="text" virfice-selector="" contenteditable=""
        virfice-id="m58e705kkmilhca7o" class=""
        style="text-align: left; padding: 36px 48px 36px 48px; background-color: #FFC900; color: #000000;font-size: 30px;">
        New Order: #{order_number}</div>
</div>


<div virfice-ele_type="section" virfice-settings_status="disabled"
    style="padding: 36px 48px 36px 48px; text-align:left;" virfice-id="m58eqnj78lwhy96tx" class="">
    <div virfice-title="Order Table" virfice-ele_type="woocommerce_email_order_details" style="text-align: left;"
        virfice-id="m58eqnj8nye46vhyg" class="">
        <div virfice-title="Text" virfice-ele_type="text" virfice-selector="" contenteditable=""
            virfice-id="m58e705kkmilhca7" class="" style="text-align: left;font-size: 14px;margin-bottom:8px;">
            You’ve received the following order from virfice</div>

        <div virfice-selector="order_details_title" style="font-size: 18px;text-decoration: underline;">
            Order #{order_number}
        </div>

        <div virfice-title="Text" virfice-ele_type="text" virfice-selector="" contenteditable=""
            virfice-id="m58e705kkmilhca" class="" style="text-align: left;font-size: 14px;">
            {order_date}</div>
        <?php include VIRFICE_PLUGIN_ROOT . "/src/woo-email-presets/Reusable/order-details.php"; ?>
    </div>
</div>


<div virfice-ele_type="section" virfice-settings_status="disabled" style="padding: 0px 40px 36px 40px; text-align:left;"
    virfice-id="m58eqnj78lwhy96t" class="">
    <?php include VIRFICE_PLUGIN_ROOT . "/src/woo-email-presets/Reusable/shipping-details.php"; ?>
</div>