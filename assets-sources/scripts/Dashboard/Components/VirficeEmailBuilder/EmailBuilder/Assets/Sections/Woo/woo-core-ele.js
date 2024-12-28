import { VIRFICE_APP_PREFIX } from "@conf";
import { getOnlyEditableTextString, getTextString } from "../core-ele";

export const getOrderDetailsString = ({ title }) =>
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
