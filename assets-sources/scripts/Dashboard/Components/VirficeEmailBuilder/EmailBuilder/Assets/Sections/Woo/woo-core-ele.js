import { VIRFICE_APP_PREFIX } from "@conf";
import { getOnlyEditableTextString, getTextString } from "../core-ele";

export const _____getOrderDetailsString = ({ title }) =>
  `<div ${VIRFICE_APP_PREFIX}-title="${
    title || "Order details"
  }" ${VIRFICE_APP_PREFIX}-ele_type="woocommerce_email_order_details" style="text-align: left;">
  <span ${VIRFICE_APP_PREFIX}-selector="order_details_title" style="font-size: 18px;">[Order #{order_number}] ({order_date})</span>
  <table ${VIRFICE_APP_PREFIX}-selector="order_table">
    <thead ${VIRFICE_APP_PREFIX}-selector="order_table_thead">
			<tr>
				<th>${getOnlyEditableTextString({
          content: "Product",
          tag: "span",
          selector: "order_table_header",
          mySelector: "order_table_header_product",
        })}</th>
				<th>${getOnlyEditableTextString({
          content: "Quantity",
          tag: "span",
          selector: "order_table_header",
          mySelector: "order_table_header_quantity",
        })}</th>
				<th>${getOnlyEditableTextString({
          content: "Price",
          tag: "span",
          selector: "order_table_header",
          mySelector: "order_table_header_price",
        })}</th>
			</tr>
		</thead>
    <tbody ${VIRFICE_APP_PREFIX}-short_code="order_items_wrapper">
			<tr ${VIRFICE_APP_PREFIX}-short_code="order_item_wrapper">
        <td ${VIRFICE_APP_PREFIX}-short_code="order_item_name">Product title</td>
        <td ${VIRFICE_APP_PREFIX}-short_code="order_item_quantity">1</td>
        <td ${VIRFICE_APP_PREFIX}-short_code="order_item_price">200.00$</td>
	    </tr>
		</tbody>
  </table>

  <table ${VIRFICE_APP_PREFIX}-selector="order_table">
    <tfoot>
			<tr>
				<th>${getOnlyEditableTextString({
          content: "Subtotal:",
          tag: "span",
          selector: "order_table_summary",
          mySelector: "order_table_summary_subtotal",
        })}</th>
					<td ${VIRFICE_APP_PREFIX}-short_code="order_subtotal">200.00$</td>
			</tr>
			<tr>
        <th>${getOnlyEditableTextString({
          content: "Shipping:",
          tag: "span",
          selector: "order_table_summary",
          mySelector: "order_table_summary_shipping",
        })}</th>
        <td ${VIRFICE_APP_PREFIX}-short_code="shipping_method">Free shipping</td>
        </tr>
        <tr>
        <th>${getOnlyEditableTextString({
          content: "Payment method:",
          tag: "span",
          selector: "order_table_summary",
          mySelector: "order_table_summary_payment_method",
        })}</th>
        <td ${VIRFICE_APP_PREFIX}-short_code="order_payment_method">Cash on delivery</td>
      </tr>
      <tr>
        <th>${getOnlyEditableTextString({
          content: "Total:",
          tag: "span",
          selector: "order_table_summary",
          mySelector: "order_table_summary_total",
        })}</th>
        <td ${VIRFICE_APP_PREFIX}-short_code="order_total">200.00$</td>
      </tr>
    </tfoot>
  </table>
  </div>`;

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

<table width="100%" border="0" cellspacing="0" cellpadding="0" virfice-short_code="order_items_wrapper" style="font-size: 14px;">
    <tbody><tr virfice-short_code="order_item_wrapper" style="border-bottom: 1px solid #E5E5E5; padding: 12px;">
        <td width="50%" style="padding: 12px 16px;">
            <div virfice-short_code="order_item_name">Product title</div>
        </td>
        <td width="25%" style="padding: 12px 16px;">
            <div virfice-short_code="order_item_quantity">1</div>
        </td>
        <td width="25%" style="padding: 12px 16px;">
            <div virfice-short_code="order_item_price">200.00$</div>
        </td>
    </tr>
</tbody></table>


<table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 317px; border: 1px solid #E5E5E5; margin-left: auto; margin-top: 32px; font-size: 13px;">
    <tbody><tr style="padding: 12px;">
        <td width="50%" style="padding: 12px 16px;">
            <div virfice-selector="order_table_summary" virfice-my_selector="order_table_summary_subtotal" contenteditable="">Subtotal:</div>
        </td>
        <td width="50%" style="padding: 12px 16px;">
            <div virfice-short_code="order_subtotal">200.00$</div>
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

    <tr style="border-top: 1px solid #E5E5E5; padding: 12px;">
        <td width="50%" style="padding: 12px 16px;">
            <div virfice-selector="order_table_summary" virfice-my_selector="order_table_summary_total" contenteditable="" style="font-weight: 600;">Total:
            </div>


        </td>
        <td width="50%" style="padding: 12px 16px;">
            <div virfice-short_code="order_total" style="font-weight: 600;">
                200.00$
            </div>
        </td>
    </tr>
</tbody></table>    </div>`;
