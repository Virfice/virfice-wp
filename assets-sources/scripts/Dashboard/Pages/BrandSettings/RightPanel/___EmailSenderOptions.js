import React from "react";
import { VIRFICE_APP_PREFIX } from "../../../../conf";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@molecules/TextField";
import { setBrandSettingsData } from "../brandSettingsSlice";

const EmailSenderOptions = () => {
  const settings = useSelector((state) => state.brandSettings.settings.data);
  const changedSettings = useSelector(
    (state) => state.brandSettings.changedSettings
  );
  const dispatch = useDispatch();

  const settingsChange = (key, value) => {
    dispatch(
      setBrandSettingsData({
        key: "changedSettings",
        value: { ...changedSettings, [key]: value },
      })
    );
  };

  return (
    <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
      <div className={`title__medium`}>Email sender options</div>
      <TextField
        label={'"From" name'}
        value={changedSettings.woocommerce_email_from_name}
        onChange={(v) => {
          settingsChange("woocommerce_email_from_name", v);
        }}
      />
      <TextField
        label={'"From" address'}
        value={changedSettings.woocommerce_email_from_address}
        onChange={(v) => {
          settingsChange("woocommerce_email_from_address", v);
        }}
      />
    </div>
  );
};

export default EmailSenderOptions;
