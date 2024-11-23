import React from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import { useDispatch, useSelector } from "react-redux";
import OrderSearch from "@components/OrderSearch";
import { setWooEmailSingleData } from "../wooEmailSingleSlice";

const OrderSelection = () => {
  const dispatch = useDispatch();
  return (
    <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
      <div className={`title__medium`}>Select an order for preview</div>
      <OrderSearch
        onOrderSelect={(order) => {
          dispatch(
            setWooEmailSingleData({
              key: "selectedOrder",
              value: order,
            })
          );
        }}
      />
    </div>
  );
};

export default OrderSelection;
