import { VIRFICE_APP_PREFIX } from "../../../../../../../conf";

export const getOrderDetailsString = ({ title }) =>
  `<div ${VIRFICE_APP_PREFIX}-title="${
    title || "Order details"
  }" ${VIRFICE_APP_PREFIX}-ele_type="woocommerce_email_order_details">
  P2F_ORDER_DETAILS
  </div>`;
