import React from "react";
import { useSelector } from "react-redux";
import SendWooTestMailButton from "@components/SendWooTestMailButton";

const SendButton = () => {
  let email_id = useSelector(
    (state) => state.wooEmailSingle?.email?.settings?.id
  );
  let selectedOrder = useSelector(
    (state) => state.wooEmailSingle?.selectedOrder
  );
  const changedSettings = useSelector(
    (state) => state.wooEmailSingle.changedSettings
  );

  return (
    <SendWooTestMailButton
      email_id={email_id}
      order_id={selectedOrder?.id || ""}
      changedSettings={changedSettings}
    />
  );
};

export default SendButton;
