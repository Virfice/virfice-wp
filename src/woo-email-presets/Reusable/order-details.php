<table width="100%" border="0" cellspacing="0" cellpadding="0" virfice-selector="order_table_thead"
    style="background-color: #FFC900; font-size: 14px; margin-top: 13px;">
    <tbody>
        <tr>
            <td width="50%" style="padding: 12px 16px;">
                <div virfice-selector="order_table_header" virfice-my_selector="order_table_header_product"
                    contenteditable="">
                    Product</div>
            </td>
            <td width="25%" style="padding: 12px 16px;">
                <div virfice-selector="order_table_header" virfice-my_selector="order_table_header_quantity"
                    contenteditable="">
                    Quantity</div>
            </td>
            <td width="25%" style="padding: 12px 16px;">
                <div virfice-selector="order_table_header" virfice-my_selector="order_table_header_price"
                    contenteditable="">
                    Price</div>
            </td>
        </tr>
    </tbody>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px;">
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
    </tbody>
</table>

<table virfice-my_selector="order_table_summary_wrapper" width="100%" border="0" cellspacing="0" cellpadding="0"
    style="max-width: 317px; border: 1px solid #E5E5E5; margin-left: auto; margin-top: 32px; font-size: 13px;">
    <tbody>
        <tr style="padding: 12px;">
            <td width="50%" style="padding: 12px 16px;">
                <div virfice-selector="order_table_summary" virfice-my_selector="order_table_summary_subtotal"
                    contenteditable="">Subtotal:</div>
            </td>
            <td width="50%" style="padding: 12px 16px;">
                <div virfice-short_code="order_subtotal">229.00$</div>
            </td>
        </tr>

        <tr style="padding: 12px;">
            <td width="50%" style="padding: 12px 16px;">
                <div virfice-selector="order_table_summary" virfice-my_selector="order_table_summary_discount"
                    contenteditable="">Discount:</div>
            </td>
            <td width="50%" style="padding: 12px 16px;">
                <div virfice-short_code="discount_amount">50.00$</div>
            </td>
        </tr>

        <tr style="padding: 12px;">
            <td width="50%" style="padding: 12px 16px;">
                <div virfice-selector="order_table_summary" virfice-my_selector="order_table_summary_shipping"
                    contenteditable="">Shipping:</div>
            </td>
            <td width="50%" style="padding: 12px 16px;">
                <div virfice-short_code="shipping_method">Free shipping</div>
            </td>
        </tr>
        <tr style="padding: 12px;">
            <td width="50%" style="padding: 12px 16px;">
                <div virfice-selector="order_table_summary" virfice-my_selector="order_table_summary_payment_method"
                    contenteditable="">Payment method:</div>

            </td>
            <td width="50%" style="padding: 12px 16px;">
                <div virfice-short_code="order_payment_method">Cash on delivery
                </div>
            </td>
        </tr>

        <tr style="border-top: 1px solid #E5E5E5; padding: 12px;"
            virfice-my_selector="order_table_summary_total_wrapper">
            <td width="50%" style="padding: 12px 16px;">
                <div virfice-selector="order_table_summary" virfice-my_selector="order_table_summary_total"
                    contenteditable="" style="font-weight: 600;">Total:
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
    <span virfice-selector="order_table_summary" virfice-my_selector="order_table_summary_order_notes"
        contenteditable="">Note:</span>
    <span virfice-short_code="customer_message">The order note will appear here.</span>
</div>