import { VIRFICE_APP_PREFIX } from "../../../../../../../conf";

export const getOrderDetailsString = ({ title }) =>
  `<div ${VIRFICE_APP_PREFIX}-title="${
    title || "Order details"
  }" ${VIRFICE_APP_PREFIX}-ele_type="woocommerce_email_order_details" style="text-align: left;">
  <h2>[Order #<span ${VIRFICE_APP_PREFIX}-short_code="order_number">208</span>] (<span ${VIRFICE_APP_PREFIX}-short_code="order_date">November 8, 2024</span>)</h2>
  <table>
    <thead>
			<tr>
				<th>Product</th>
				<th>Quantity</th>
				<th>Price</th>
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
				<th>Subtotal:</th>
					<td ${VIRFICE_APP_PREFIX}-short_code="order_subtotal">200.00$</td>
			</tr>
			<tr>
        <th>Shipping:</th>
        <td ${VIRFICE_APP_PREFIX}-short_code="shipping_method">Free shipping</td>
        </tr>
        <tr>
        <th>Payment method:</th>
        <td ${VIRFICE_APP_PREFIX}-short_code="order_payment_method">Cash on delivery</td>
      </tr>
      <tr>
        <th>Total:</th>
        <td ${VIRFICE_APP_PREFIX}-short_code="order_total">200.00$</td>
      </tr>
    </tfoot>
  </table>
  </div>`;
