export const getOrderDetailsString = ({ title }) =>
  `<div virfice-title="${title}" virfice-ele_type="woocommerce_email_order_details" style="text-align: left;" virfice-id="m58eqnj8nye46vhyg" class="">
        <div virfice-title="Text" virfice-ele_type="text" virfice-selector="" contenteditable="" virfice-id="m58e705kkmilhca7" class="" style="text-align: left;font-size: 14px;margin-bottom:8px;">
            You’ve received the following order from virfice</div>

        <div virfice-selector="order_details_title" style="font-size: 18px;text-decoration: underline;">
            Order #{order_number}
        </div>

        <div virfice-title="Text" virfice-ele_type="text" virfice-selector="" contenteditable="" virfice-id="m58e705kkmilhca" class="" style="text-align: left;font-size: 14px;">
            {order_date}</div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" virfice-selector="order_table_thead" style="background-color: #FFC900; font-size: 14px; margin-top: 13px;">
    <tbody><tr>
        <td width="50%" style="padding: 12px 16px;">
            <div virfice-selector="order_table_header" virfice-my_selector="order_table_header_product" contenteditable="">
                Product</div>
        </td>
        <td width="25%" style="padding: 12px 16px;">
            <div virfice-selector="order_table_header" virfice-my_selector="order_table_header_quantity" contenteditable="">
                Quantity</div>
        </td>
        <td width="25%" style="padding: 12px 16px;">
            <div virfice-selector="order_table_header" virfice-my_selector="order_table_header_price" contenteditable="">
                Price</div>
        </td>
    </tr>
</tbody></table>

<table width="100%" border="0" cellspacing="0" cellpadding="0"  style="font-size: 14px;">
    <tbody virfice-short_code="order_items_wrapper">
    
    <tr virfice-short_code="order_item_wrapper" style="border-bottom: 1px solid #E5E5E5; padding: 12px;">
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

    <tr virfice-short_code="order_item_wrapper" style="border-bottom: 1px solid #E5E5E5; padding: 12px;">
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
</tbody></table>


<table virfice-my_selector="order_table_summary_wrapper" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 317px; border: 1px solid #E5E5E5; margin-left: auto; margin-top: 32px; font-size: 13px;">
    <tbody>
    <tr style="padding: 12px;">
        <td width="50%" style="padding: 12px 16px;">
            <div virfice-selector="order_table_summary" virfice-my_selector="order_table_summary_subtotal" contenteditable="">Subtotal:</div>
        </td>
        <td width="50%" style="padding: 12px 16px;">
            <div virfice-short_code="order_subtotal">229.00$</div>
        </td>
    </tr>

    <tr style="padding: 12px;">
        <td width="50%" style="padding: 12px 16px;">
            <div virfice-selector="order_table_summary" virfice-my_selector="order_table_summary_discount" contenteditable="">Discount:</div>
        </td>
        <td width="50%" style="padding: 12px 16px;">
            <div virfice-short_code="discount_amount">50.00$</div>
        </td>
    </tr>

    <tr style="padding: 12px;">
        <td width="50%" style="padding: 12px 16px;">
            <div virfice-selector="order_table_summary" virfice-my_selector="order_table_summary_shipping" contenteditable="">Shipping:</div>
        </td>
        <td width="50%" style="padding: 12px 16px;">
            <div virfice-short_code="shipping_method">Free shipping</div>
        </td>
    </tr>
    <tr style="padding: 12px;">
        <td width="50%" style="padding: 12px 16px;">
            <div virfice-selector="order_table_summary" virfice-my_selector="order_table_summary_payment_method" contenteditable="">Payment method:</div>

        </td>
        <td width="50%" style="padding: 12px 16px;">
            <div virfice-short_code="order_payment_method">Cash on delivery
            </div>
        </td>
    </tr>

    <tr style="border-top: 1px solid #E5E5E5; padding: 12px;" virfice-my_selector="order_table_summary_total_wrapper">
        <td width="50%" style="padding: 12px 16px;">
            <div virfice-selector="order_table_summary" virfice-my_selector="order_table_summary_total" contenteditable="" style="font-weight: 600;">Total:
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
    <div style="margin-top: 32px;">
        <span virfice-selector="order_table_summary" virfice-my_selector="order_table_summary_order_notes" contenteditable="">Note:</span>
        <span virfice-short_code="order_notes">The order note will appear here.</span>
    </div>
</div>`;

export const getOrderAddressString = ({ title = "Order Address" }) =>
  `<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px;" virfice-title="${title}"
    virfice-ele_type="woocommerce_email_order_address" class="" virfice-id="m6wm8dsxduvdcz1gr">
    <tbody>
        <tr>
            <td width="50%">
                <div virfice-title="Billing title" virfice-ele_type="text" contenteditable=""
                    style="margin-bottom: 16px; font-size: 18px;" virfice-id="m6wm8dsxr1qrrctuy">Billing Address
                </div>
            </td>
            <td width="50%">
                <div virfice-title="Shipping title" virfice-ele_type="text" contenteditable=""
                    style="margin-bottom: 16px; font-size: 18px;" virfice-id="m6wm8dsxq7ak22rv7">Shipping Address
                </div>
            </td>
        </tr>
        <tr>
            <td width="50%" virfice-selector="order_address" virfice-my_selector="order_billing_address"
                style="padding: 13px; border: 1px solid #E5E5E5;vertical-align: baseline;">
                <div virfice-short_code="order_billing_address">
                    <div>
                        <div>Jhon Doe</div>
                        <div>Virfice</div>
                        <div>7400 Edwards Rd</div>
                        <div>Edwards rd</div>
                        <div>(910) XXX-XXXX</div>
                    </div>
                </div>
            </td>

            <td width="50%" virfice-selector="order_address" virfice-my_selector="order_shipping_address"
                style="padding: 13px; border: 1px solid #E5E5E5;vertical-align: baseline;">
                <div virfice-short_code="order_shipping_address">
                    <div>
                        <div>Jhon Doe</div>
                        <div>Virfice</div>
                        <div>7400 Edwards Rd</div>
                        <div>Edwards rd</div>
                        <div>(910) XXX-XXXX</div>
                    </div>
                </div>
            </td>
        </tr>
    </tbody>
</table>`;
