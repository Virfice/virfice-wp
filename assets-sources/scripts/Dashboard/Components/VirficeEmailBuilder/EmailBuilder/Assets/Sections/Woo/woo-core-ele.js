import { VIRFICE_APP_PREFIX } from "@conf";
import { getOnlyEditableTextString, getTextString } from "../core-ele";

export const getOrderDetailsString = ({ title }) =>
  `<div ${VIRFICE_APP_PREFIX}-title="${
    title || "Order details"
  }" ${VIRFICE_APP_PREFIX}-ele_type="woocommerce_email_order_details" style="text-align: left;">
  <h2 ${VIRFICE_APP_PREFIX}-selector="order_details_title">[Order #<span ${VIRFICE_APP_PREFIX}-short_code="order_number">208</span>] (<span ${VIRFICE_APP_PREFIX}-short_code="order_date">November 8, 2024</span>)</h2>
  <table>
    <thead ${VIRFICE_APP_PREFIX}-selector="order_table_thead">
			<tr>
				<th>${getOnlyEditableTextString({
          content: "Product",
          tag: "span",
          selector: "order_table_header",
        })}</th>
				<th>${getOnlyEditableTextString({
          content: "Quantity",
          tag: "span",
          selector: "order_table_header",
        })}</th>
				<th>${getOnlyEditableTextString({
          content: "Price",
          tag: "span",
          selector: "order_table_header",
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
    <tfoot>
			<tr>
				<th>${getOnlyEditableTextString({
          content: "Subtotal:",
          tag: "span",
          selector: "order_table_header",
        })}</th>
					<td ${VIRFICE_APP_PREFIX}-short_code="order_subtotal">200.00$</td>
			</tr>
			<tr>
        <th>${getOnlyEditableTextString({
          content: "Shipping:",
          tag: "span",
          selector: "order_table_header",
        })}</th>
        <td ${VIRFICE_APP_PREFIX}-short_code="shipping_method">Free shipping</td>
        </tr>
        <tr>
        <th>${getOnlyEditableTextString({
          content: "Payment method:",
          tag: "span",
          selector: "order_table_header",
        })}</th>
        <td ${VIRFICE_APP_PREFIX}-short_code="order_payment_method">Cash on delivery</td>
      </tr>
      <tr>
        <th>${getOnlyEditableTextString({
          content: "Total:",
          tag: "span",
          selector: "order_table_header",
        })}</th>
        <td ${VIRFICE_APP_PREFIX}-short_code="order_total">200.00$</td>
      </tr>
    </tfoot>
  </table>
  </div>`;
