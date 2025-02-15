<?php

use Virfice\API\Settings;
use Virfice\Utils;

$social_icons_html = Utils::get_social_icons_html('');
$store_address_html = Utils::get_store_address_html();
$settings = Settings::get_email_settings();
$brand_settings = Utils::get_virfice_brand_settings();

// echo "<pre>";
// var_dump($brand_settings);
// die;
$store_logo = $brand_settings['logo'];
$store_name = $brand_settings['store_name'];
?>
<div virfice-ele_type="section" virfice-settings_status="disabled" style="padding: 26px 0px; text-align: center;"
    virfice-id="m6c9744tsdk97ahbb">
    <?php if ($store_logo) { ?>
        <a virfice-ele_type="image" virfice-title="Image" style="width:100%;" virfice-id="m6c9744t1tyq8ef9s"><img
                virfice-my_selector="image" virfice-short_code="store_logo" src="<?php echo $store_logo; ?>"
                style="margin-left: auto; margin-right: auto;"></a>
    <?php } else if ($store_name) { ?>
        <p><?php echo $store_name; ?></p>
    <?php } ?>
</div>
<div virfice-ele_type="section" virfice-settings_status="disabled" virfice-id="m4e94we0e01ydsfn">
    <div virfice-ele_type="brand-settings" style="text-align:center;" virfice-id="m4e94we0e0192jpyn" class="">



        <div virfice-ele_type="section" virfice-settings_status="disabled"
            style="padding-top: 0px; padding-bottom: 0px; text-align: center;" virfice-id="m58e705klg2ri1fb7" class="">
            <div virfice-title="Text" virfice-ele_type="text" virfice-selector="" contenteditable=""
                virfice-id="m58e705kkmilhca7o" class=""
                style="text-align: left; padding: 36px 48px 36px 48px; background-color: #FFC900; color: #000000;font-size: 30px;">
                New Order: #{order_number}</div>
        </div>


        <div virfice-ele_type="section" virfice-settings_status="disabled"
            style="padding: 36px 48px 36px 48px; text-align:left;" virfice-id="m58eqnj78lwhy96tx" class="">
            <div virfice-title="Order Table" virfice-ele_type="woocommerce_email_order_details"
                style="text-align: left;" virfice-id="m58eqnj8nye46vhyg" class="">
                <div virfice-title="Text" virfice-ele_type="text" virfice-selector="" contenteditable=""
                    virfice-id="m58e705kkmilhca7" class="" style="text-align: left;font-size: 14px;margin-bottom:8px;">
                    You’ve received the following order from virfice</div>

                <div virfice-selector="order_details_title" style="font-size: 18px;text-decoration: underline;">
                    Order #{order_number}
                </div>

                <div virfice-title="Text" virfice-ele_type="text" virfice-selector="" contenteditable=""
                    virfice-id="m58e705kkmilhca" class="" style="text-align: left;font-size: 14px;">
                    {order_date}</div>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" virfice-selector="order_table_thead"
                    style="background-color: #FFC900; font-size: 14px; margin-top: 13px;">
                    <tbody>
                        <tr>
                            <td width="50%" style="padding: 12px 16px;">
                                <div virfice-selector="order_table_header"
                                    virfice-my_selector="order_table_header_product" contenteditable="">
                                    Product</div>
                            </td>
                            <td width="25%" style="padding: 12px 16px;">
                                <div virfice-selector="order_table_header"
                                    virfice-my_selector="order_table_header_quantity" contenteditable="">
                                    Quantity</div>
                            </td>
                            <td width="25%" style="padding: 12px 16px;">
                                <div virfice-selector="order_table_header"
                                    virfice-my_selector="order_table_header_price" contenteditable="">
                                    Price</div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px;">
                    <tbody virfice-short_code="order_items_wrapper">

                        <tr virfice-short_code="order_item_wrapper"
                            style="border-bottom: 1px solid #E5E5E5; padding: 12px;">
                            <td width="50%" style="padding: 12px 16px;">
                                <div virfice-short_code="order_item_name">Sneakers</div>
                            </td>
                            <td width="25%" style="padding: 12px 16px;">
                                <div virfice-short_code="order_item_quantity">1</div>
                            </td>
                            <td width="25%" style="padding: 12px 16px;">
                                <div virfice-short_code="order_item_price">200.00$</div>
                            </td>
                        </tr>

                        <tr virfice-short_code="order_item_wrapper"
                            style="border-bottom: 1px solid #E5E5E5; padding: 12px;">
                            <td width="50%" style="padding: 12px 16px;">
                                <div virfice-short_code="order_item_name">Socks All Day</div>
                            </td>
                            <td width="25%" style="padding: 12px 16px;">
                                <div virfice-short_code="order_item_quantity">2</div>
                            </td>
                            <td width="25%" style="padding: 12px 16px;">
                                <div virfice-short_code="order_item_price">29.00$</div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table virfice-my_selector="order_table_summary_wrapper" width="100%" border="0" cellspacing="0"
                    cellpadding="0"
                    style="max-width: 317px; border: 1px solid #E5E5E5; margin-left: auto; margin-top: 32px; font-size: 13px;">
                    <tbody>
                        <tr style="padding: 12px;">
                            <td width="50%" style="padding: 12px 16px;">
                                <div virfice-selector="order_table_summary"
                                    virfice-my_selector="order_table_summary_subtotal" contenteditable="">Subtotal:
                                </div>
                            </td>
                            <td width="50%" style="padding: 12px 16px;">
                                <div virfice-short_code="order_subtotal">229.00$</div>
                            </td>
                        </tr>

                        <tr style="padding: 12px;">
                            <td width="50%" style="padding: 12px 16px;">
                                <div virfice-selector="order_table_summary"
                                    virfice-my_selector="order_table_summary_discount" contenteditable="">Discount:
                                </div>
                            </td>
                            <td width="50%" style="padding: 12px 16px;">
                                <div virfice-short_code="discount_amount">50.00$</div>
                            </td>
                        </tr>

                        <tr style="padding: 12px;">
                            <td width="50%" style="padding: 12px 16px;">
                                <div virfice-selector="order_table_summary"
                                    virfice-my_selector="order_table_summary_shipping" contenteditable="">Shipping:
                                </div>
                            </td>
                            <td width="50%" style="padding: 12px 16px;">
                                <div virfice-short_code="shipping_method">Free shipping</div>
                            </td>
                        </tr>
                        <tr style="padding: 12px;">
                            <td width="50%" style="padding: 12px 16px;">
                                <div virfice-selector="order_table_summary"
                                    virfice-my_selector="order_table_summary_payment_method" contenteditable="">
                                    Payment method:</div>

                            </td>
                            <td width="50%" style="padding: 12px 16px;">
                                <div virfice-short_code="order_payment_method">Cash on delivery
                                </div>
                            </td>
                        </tr>

                        <tr style="border-top: 1px solid #E5E5E5; padding: 12px;"
                            virfice-my_selector="order_table_summary_total_wrapper">
                            <td width="50%" style="padding: 12px 16px;">
                                <div virfice-selector="order_table_summary"
                                    virfice-my_selector="order_table_summary_total" contenteditable=""
                                    style="font-weight: 600;">Total:
                                </div>


                            </td>
                            <td width="50%" style="padding: 12px 16px;">
                                <div virfice-short_code="order_total" style="font-weight: 600;">
                                    179.00$
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


        <div virfice-ele_type="section" virfice-settings_status="disabled"
            style="padding: 0px 40px 40px; text-align: center;" virfice-id="m6wm9uns1emtyg680">
            <div virfice-title="Divider" virfice-ele_type="divider"
                style="border-bottom: 1px solid #E5E5E5; width: 100%;" virfice-id="m6wm9unsefl7jhvte"></div>
        </div>

        <div virfice-ele_type="section" virfice-settings_status="disabled"
            style="padding: 0px 40px 36px 40px; text-align:left;" virfice-id="m58eqnj78lwhy96t" class="">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px;"
                virfice-title="Order Address" virfice-ele_type="woocommerce_email_order_address" class=""
                virfice-id="m6wm8dsxduvdcz1gr">
                <tbody>
                    <tr>
                        <td width="50%" virfice-selector="order_address" virfice-my_selector="order_billing_address">
                            <div>
                                <div virfice-title="Billing title" virfice-ele_type="text" contenteditable=""
                                    style="margin-bottom: 16px; font-size: 18px;" virfice-id="m6wm8dsxr1qrrctuy">
                                    Billing Address
                                </div>
                                <div style="padding: 13px; border: 1px solid #E5E5E5;">
                                    <div virfice-short_code="order_billing_address">
                                        <div>
                                            <div>Jhon Doe</div>
                                            <div>Virfice</div>
                                            <div>7400 Edwards Rd</div>
                                            <div>Edwards rd</div>
                                            <div>(910) XXX-XXXX</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td width="50%" virfice-selector="order_address" virfice-my_selector="order_shipping_address">
                            <div>
                                <div virfice-title="Shipping title" virfice-ele_type="text" contenteditable=""
                                    style="margin-bottom: 16px; font-size: 18px;" virfice-id="m6wm8dsxq7ak22rv7">
                                    Shipping Address
                                </div>
                                <div style="padding: 13px; border: 1px solid #E5E5E5;">
                                    <div virfice-short_code="order_shipping_address">
                                        <div>
                                            <div>Jhon Doe</div>
                                            <div>Virfice</div>
                                            <div>7400 Edwards Rd</div>
                                            <div>Edwards rd</div>
                                            <div>(910) XXX-XXXX</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div virfice-ele_type="section" virfice-settings_status="disabled" style="padding: 4px 0px; text-align: center;"
            virfice-id="m6wnkb1mpmn8he6lm">
            <div virfice-title="Divider" virfice-ele_type="divider"
                style="border-top-width: 2px; border-style: none; width: 100%;" virfice-id="m6wnkb1meo7i1k0sg"></div>
        </div>
        <table virfice-title="Columns" virfice-settings_status="disabled" virfice-ele_type="section"
            virfice-id="m6wn0varhdzlinwqx">
            <tbody virfice-title="Columns" virfice-ele_type="row" virfice-id="m6wn0vary0lb2d9sn">
                <tr>
                    <td virfice-title="Column 1" virfice-ele_type="column"
                        style="padding-bottom: 16px; text-align: center; padding-left: 40px; padding-right: 0px;"
                        virfice-id="m6wn0varvqwcow45d">

                        <p virfice-title="Text" virfice-ele_type="text" virfice-selector="" contenteditable=""
                            virfice-id="m6wn0var84hvsc" style="font-size: 11px; text-align: left;">Limited offer!
                        </p>
                        <p virfice-title="Text" virfice-ele_type="text" virfice-selector="" contenteditable=""
                            virfice-id="m6wn0var84hvscpl0" style="font-size: 40px; text-align: left;">GET 50% OFF
                        </p>

                        <p virfice-title="Text" virfice-ele_type="text" virfice-selector="" contenteditable=""
                            virfice-id="m6wn0var84hvscpl" style="font-size: 20px; text-align: left;">On Your Next
                            Purchase</p>
                    </td>
                    <td virfice-title="Column 2" virfice-ele_type="column"
                        style="padding-bottom: 16px; text-align: center; padding-left: 0px; padding-right: 40px;"
                        virfice-id="m6wn0varmrwsj6lj3">


                        <a virfice-title="Button" virfice-ele_type="link"
                            style="border-radius: 0px; padding: 18px 16px; width: 247px; text-align: center; max-width: 100%; margin-bottom: 8px; font-size: 20px;"
                            contenteditable="" virfice-id="m6wn0var6y2e6i85e">SHOP NOW</a>
                        <p virfice-title="Text" virfice-ele_type="text" virfice-selector="" contenteditable=""
                            virfice-id="m6wn0var0nze7xnbk" style="font-size: 10px;">T&amp;C’s apply*</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <div virfice-ele_type="section" virfice-settings_status="disabled"
            style="padding: 64px 0px 0px 0px; text-align: center;" virfice-id="m6wnkb1mpmn8he6lm">
            <div virfice-title="Divider" virfice-ele_type="divider"
                style="border-top-width: 2px; border-style: none; width: 100%;" virfice-id="m6wnkb1meo7i1k0sg"></div>
        </div>


    </div>
</div>