import React from "react";
import { useSelector } from "react-redux";
import SendWooTestMailButton from "@components/SendWooTestMailButton";

const SendButton = () => {
  let currentEmail = useSelector((state) => state.brandSettings?.currentEmail);
  let selectedOrder = useSelector(
    (state) => state.brandSettings?.selectedOrder
  );
  const changedSettings = useSelector(
    (state) => state.brandSettings.changedSettings
  );

  return (
    <SendWooTestMailButton
      email_id={currentEmail.id}
      order_id={selectedOrder?.id || ""}
      changedSettings={changedSettings}
    />
  );
};

export default SendButton;
