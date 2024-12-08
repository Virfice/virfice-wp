import React from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import SelectField from "@molecules/SelectField";
import { useDispatch, useSelector } from "react-redux";
import { setBrandSettingsData } from "../brandSettingsSlice";
import OrderSearch from "@components/OrderSearch";

const EmailSelection = () => {
  const emailList = useSelector((state) => state.brandSettings.emailList.data);
  // const currentEmail = useSelector((state) => state.brandSettings.currentEmail);
  const dispatch = useDispatch();

  const options = emailList.map((email) => {
    return { value: email.id, title: email.title, ...email };
  });

  const handleOnChange = (value) => {
    dispatch(setBrandSettingsData({ key: "currentEmail", value }));
  };
  return (
    <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
      <div className={`title__medium`}>WooCommerce email templates</div>
      <SelectField
        label={"Template type"}
        value={{ value: "", title: "New order" }}
        options={options}
        onChange={handleOnChange}
      />
      <OrderSearch
        onOrderSelect={(order) => {
          dispatch(
            setBrandSettingsData({ key: "selectedOrder", value: order })
          );
        }}
      />
    </div>
  );
};

export default EmailSelection;
