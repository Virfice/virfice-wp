import React from "react";
import CheckboxField from "../../Molecules/CheckboxField";
import { useDispatch } from "react-redux";
import { updateVirficeTemplateStatus } from "./wooEmailListSlice";

const SingleItemVirficeTemplateStatus = ({
  email,
  setVirfice_template_status,
}) => {
  const dispatch = useDispatch();
  const handleStatusChange = (v) => {
    dispatch(updateVirficeTemplateStatus(email.id, v));
    setVirfice_template_status(v);
  };
  return (
    <CheckboxField
      label={"Enable"}
      value={email.virfice_template_status || false}
      onChange={handleStatusChange}
    />
  );
};

export default SingleItemVirficeTemplateStatus;
