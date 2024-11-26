import { VIRFICE_APP_PREFIX } from "@conf";
import { getTextString } from "../core-ele";

export const getOrderDetailsString = ({ title }) =>
  `<div ${VIRFICE_APP_PREFIX}-title="${
    title || "Order details"
  }" ${VIRFICE_APP_PREFIX}-ele_type="woocommerce_email_order_details" style="text-align: left;">
  <h2>[Order #<span ${VIRFICE_APP_PREFIX}-short_code="order_number">208</span>] (<span ${VIRFICE_APP_PREFIX}-short_code="order_date">November 8, 2024</span>)</h2>
  <table>
    <thead>
			<tr>
				<th>${getTextString({
          title: "Product",
          content: "Product",
          tag: "span",
        })}</th>
				<th>${getTextString({
          title: "Quantity",
          content: "Quantity",
          tag: "span",
        })}</th>
				<th>${getTextString({
          title: "Price",
          content: "Price",
          tag: "span",
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
				<th>${getTextString({
          title: "Subtotal",
          content: "Subtotal:",
          tag: "span",
        })}Subtotal:</th>
					<td ${VIRFICE_APP_PREFIX}-short_code="order_subtotal">200.00$</td>
			</tr>
			<tr>
        <th>${getTextString({
          title: "Shipping",
          content: "Shipping:",
          tag: "span",
        })}</th>
        <td ${VIRFICE_APP_PREFIX}-short_code="shipping_method">Free shipping</td>
        </tr>
        <tr>
        <th>${getTextString({
          title: "Payment method",
          content: "Payment method:",
          tag: "span",
        })}</th>
        <td ${VIRFICE_APP_PREFIX}-short_code="order_payment_method">Cash on delivery</td>
      </tr>
      <tr>
        <th>${getTextString({
          title: "Total",
          content: "Total:",
          tag: "span",
        })}</th>
        <td ${VIRFICE_APP_PREFIX}-short_code="order_total">200.00$</td>
      </tr>
    </tfoot>
  </table>
  </div>`;
