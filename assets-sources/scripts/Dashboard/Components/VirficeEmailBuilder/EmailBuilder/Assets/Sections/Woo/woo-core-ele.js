import { VIRFICE_APP_PREFIX } from "../../../../../../../conf";

export const getOrderDetailsString = ({ title }) =>
  `<div ${VIRFICE_APP_PREFIX}-title="${
    title || "Order details"
  }" ${VIRFICE_APP_PREFIX}-ele_type="woocommerce_email_order_details">
  <table class="td" cellspacing="0" cellpadding="6" border="1" style="color: #fff;border: 1px solid #000;vertical-align: middle;width: 100%;font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif" width="100%">
		<thead>
			<tr>
				<th class="td" scope="col" style="color: #fff;border: 1px solid #000;vertical-align: middle;padding: 12px;text-align: left" align="left">Product</th>
				<th class="td" scope="col" style="color: #fff;border: 1px solid #000;vertical-align: middle;padding: 12px;text-align: left" align="left">Quantity</th>
				<th class="td" scope="col" style="color: #fff;border: 1px solid #000;vertical-align: middle;padding: 12px;text-align: left" align="left">Price</th>
			</tr>
		</thead>
		<tbody>
				<tr class="order_item">
		<td class="td" style="color: #fff;border: 1px solid #000;padding: 12px;text-align: left;vertical-align: middle;font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif" align="left">
		Test Product		</td>
		<td class="td" style="color: #fff;border: 1px solid #000;padding: 12px;text-align: left;vertical-align: middle;font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif" align="left">
			1		</td>
		<td class="td" style="color: #fff;border: 1px solid #000;padding: 12px;text-align: left;vertical-align: middle;font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif" align="left">
			<span class="woocommerce-Price-amount amount">200.00<span class="woocommerce-Price-currencySymbol">৳&nbsp;</span></span>		</td>
	</tr>
	
		</tbody>
		<tfoot>
								<tr>
						<th class="td" scope="row" colspan="2" style="color: #fff;border: 1px solid #000;vertical-align: middle;padding: 12px;text-align: left;border-top-width: 4px" align="left">Subtotal:</th>
						<td class="td" style="color: #fff;border: 1px solid #000;vertical-align: middle;padding: 12px;text-align: left;border-top-width: 4px" align="left"><span class="woocommerce-Price-amount amount">200.00<span class="woocommerce-Price-currencySymbol">৳&nbsp;</span></span></td>
					</tr>
										<tr>
						<th class="td" scope="row" colspan="2" style="color: #fff;border: 1px solid #000;vertical-align: middle;padding: 12px;text-align: left" align="left">Shipping:</th>
						<td class="td" style="color: #fff;border: 1px solid #000;vertical-align: middle;padding: 12px;text-align: left" align="left">Free shipping</td>
					</tr>
										<tr>
						<th class="td" scope="row" colspan="2" style="color: #fff;border: 1px solid #000;vertical-align: middle;padding: 12px;text-align: left" align="left">Payment method:</th>
						<td class="td" style="color: #fff;border: 1px solid #000;vertical-align: middle;padding: 12px;text-align: left" align="left">Cash on delivery</td>
					</tr>
										<tr>
						<th class="td" scope="row" colspan="2" style="color: #fff;border: 1px solid #000;vertical-align: middle;padding: 12px;text-align: left" align="left">Total:</th>
						<td class="td" style="color: #fff;border: 1px solid #000;vertical-align: middle;padding: 12px;text-align: left" align="left"><span class="woocommerce-Price-amount amount">200.00<span class="woocommerce-Price-currencySymbol">৳&nbsp;</span></span></td>
					</tr>
							</tfoot>
	</table>
  </div>`;
