import React from "react";
import { useSelector } from "react-redux";
import SendTestMailButton from "../../../Components/SendTestMailButton";

const SendButton = () => {
  let currentEmail = useSelector((state) => state.brandSettings?.currentEmail);
  let selectedOrder = useSelector((state) => state.brandSettings?.selectedOrder);
  const changedSettings = useSelector(
    (state) => state.brandSettings.changedSettings
  );
  
  return (
    <SendTestMailButton email_id={currentEmail.id} order_id={selectedOrder?.id||''} changedSettings={changedSettings}/>
  );
};

export default SendButton;
