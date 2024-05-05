import React from "react";
import { VIRFICE_APP_PREFIX } from "../../../../conf";
import Paintfield from "../../../Molecules/Paintfield";
import { useDispatch, useSelector } from "react-redux";
import { setBrandSettingsData } from "../brandSettingsSlice";
import Textfield from "../../../Molecules/Textfield";
import MediaUploader from "../../../Molecules/MediaUploader";

const GlobalSettings = () => {
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
      <div className={`title__medium`}>Email template options</div>
      <MediaUploader
        label={"Brand logo"}
        value={
          changedSettings.woocommerce_email_header_image
        }
        onDelete={() => {
          settingsChange("woocommerce_email_header_image", "");
        }}
        onSelect={(media) => {
          settingsChange("woocommerce_email_header_image", media.url);
        }}
        info={'An image you want to show in the email header.'}
      />
      <Textfield
        label={"Footer text"}
        value={
          changedSettings.woocommerce_email_footer_text
        }
        onChange={(v) => {
          settingsChange("woocommerce_email_footer_text", v);
        }}
        multiline
      />

      <Paintfield
        label={"Base color"}
        value={
          changedSettings.woocommerce_email_base_color
        }
        onChange={(v) => {
          settingsChange("woocommerce_email_base_color", v);
        }}
      />
      <Paintfield
        label={"Background color"}
        value={
          changedSettings.woocommerce_email_background_color
        }
        onChange={(v) => {
          settingsChange("woocommerce_email_background_color", v);
        }}
      />
      <Paintfield
        label={"Body background color"}
        value={
          changedSettings.woocommerce_email_body_background_color
        }
        onChange={(v) => {
          settingsChange("woocommerce_email_body_background_color", v);
        }}
      />
      <Paintfield
        label={"Body text color"}
        value={
          changedSettings.woocommerce_email_text_color
        }
        onChange={(v) => {
          settingsChange("woocommerce_email_text_color", v);
        }}
      />
    </div>
  );
};

export default GlobalSettings;
