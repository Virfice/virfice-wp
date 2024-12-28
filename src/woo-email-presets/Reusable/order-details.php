<div class="virfice-columns" virfice-selector="order_table_thead"
    style="background-color: #FFC900; padding: 12px 16px; font-size: 14px; margin-top: 13px;">
    <div class="virfice-column virfice-column-50">
        <div virfice-selector="order_table_header" virfice-my_selector="order_table_header_product" contenteditable="">
            Product</div>
    </div>
    <div class="virfice-column virfice-column-25">
        <div virfice-selector="order_table_header" virfice-my_selector="order_table_header_quantity" contenteditable="">
            Quantity</div>
    </div>
    <div class="virfice-column virfice-column-25">
        <div virfice-selector="order_table_header" virfice-my_selector="order_table_header_price" contenteditable="">
            Price</div>
    </div>
</div>

<div virfice-short_code="order_items_wrapper">
    <div class="virfice-columns" virfice-short_code="order_item_wrapper"
        style="border-bottom: 1px solid #E5E5E5; padding: 12px;">
        <div class="virfice-column virfice-column-50" virfice-short_code="order_item_name">Product title</div>
        <div class="virfice-column virfice-column-25" virfice-short_code="order_item_quantity">1</div>
        <div class="virfice-column virfice-column-25" virfice-short_code="order_item_price">200.00$</div>
    </div>

    <div class="virfice-columns" virfice-short_code="order_item_wrapper"
        style="border-bottom: 1px solid #E5E5E5; padding: 12px">
        <div class="virfice-column virfice-column-50" virfice-short_code="order_item_name">Product title</div>
        <div class="virfice-column virfice-column-25" virfice-short_code="order_item_quantity">1</div>
        <div class="virfice-column virfice-column-25" virfice-short_code="order_item_price">200.00$</div>
    </div>
</div>


<div style="max-width: 317px; border: 1px solid #E5E5E5; margin-left: auto; margin-top: 32px;">
    <div class="virfice-columns" style="padding: 15px 13px 13px 13px;">
        <div class="virfice-column virfice-column-50" virfice-selector="order_table_summary"
            virfice-my_selector="order_table_summary_subtotal" contenteditable="">Subtotal:</div>
        <div class="virfice-column virfice-column-50" virfice-short_code="order_subtotal">200.00$</div>
    </div>

    <div class="virfice-columns" style="padding: 15px 13px 13px 13px;">
        <div class="virfice-column virfice-column-50" virfice-selector="order_table_summary"
            virfice-my_selector="order_table_summary_shipping" contenteditable="">Shipping:</div>
        <div class="virfice-column virfice-column-50" virfice-short_code="shipping_method">Free shipping</div>
    </div>


    <div class="virfice-columns" style="padding: 15px 13px 13px 13px;">
        <div class="virfice-column virfice-column-50" virfice-selector="order_table_summary"
            virfice-my_selector="order_table_summary_payment_method" contenteditable="">Payment method:</div>
        <div class="virfice-column virfice-column-50" virfice-short_code="order_payment_method">Cash on delivery
        </div>
    </div>


    <div class="virfice-columns" style="padding: 15px 13px 13px 13px; border-top: 1px solid #E5E5E5;">
        <div class="virfice-column virfice-column-50" virfice-selector="order_table_summary"
            virfice-my_selector="order_table_summary_total" contenteditable="" style="font-weight: 600;">Total:
        </div>
        <div class="virfice-column virfice-column-50" virfice-short_code="order_total" style="font-weight: 600;">200.00$
        </div>
    </div>

</div>