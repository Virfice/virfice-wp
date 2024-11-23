import React from "react";
import { VIRFICE_APP_PREFIX } from "../../../../conf";
import PaintField from "@molecules/Paintfield";
import { useDispatch, useSelector } from "react-redux";
import { setBrandSettingsData } from "../brandSettingsSlice";
import TextField from "@molecules/TextField";
import MediaUploader from "@molecules/MediaUploader";
import CheckboxField from "@molecules/CheckboxField";
import FormInfo from "../../../Components/FormInfo";
import { addParams } from "../../../../functions";
// import ToggleButton from "@molecules/ToggleButton";
// import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "../../../icons";

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
        value={changedSettings.woocommerce_email_header_image}
        onDelete={() => {
          settingsChange("woocommerce_email_header_image", "");
        }}
        onSelect={(media) => {
          settingsChange("woocommerce_email_header_image", media.url);
        }}
        info={"An image you want to show in the email header."}
      />
      {/* <ToggleButton
        label={"Position"}
        value={changedSettings.virfice_email_logo_position || "center"}
        options={[
          { value: "left", component: <AlignLeftIcon /> },
          { value: "center", component: <AlignCenterIcon /> },
          { value: "right", component: <AlignRightIcon /> },
        ]}
        onChange={(v) => {
          settingsChange("virfice_email_logo_position", v);
        }}
      /> */}
      <TextField
        label={"Footer text"}
        value={changedSettings.woocommerce_email_footer_text}
        onChange={(v) => {
          settingsChange("woocommerce_email_footer_text", v);
        }}
        multiline={3}
      />

      <PaintField
        label={"Base color"}
        value={changedSettings.woocommerce_email_base_color}
        onChange={(v) => {
          settingsChange("woocommerce_email_base_color", v);
        }}
      />
      <PaintField
        label={"Background color"}
        value={changedSettings.woocommerce_email_background_color}
        onChange={(v) => {
          settingsChange("woocommerce_email_background_color", v);
        }}
      />
      <PaintField
        label={"Body background color"}
        value={changedSettings.woocommerce_email_body_background_color}
        onChange={(v) => {
          settingsChange("woocommerce_email_body_background_color", v);
        }}
      />
      <PaintField
        label={"Body text color"}
        value={changedSettings.woocommerce_email_text_color}
        onChange={(v) => {
          settingsChange("woocommerce_email_text_color", v);
        }}
      />
      <CheckboxField
        title={"Socials"}
        label={"Show social media icons"}
        helpText={
          <span>
            You can update your social links from{" "}
            <a href={addParams({ menu: "settings" })}>Email Settings</a>
          </span>
        }
        value={changedSettings.virfice_show_social_icons || false}
        onChange={(v) => {
          settingsChange("virfice_show_social_icons", v);
        }}
      />
      <TextField
        label={"Social media section heading"}
        value={changedSettings.virfice_social_icons_heading || ""}
        onChange={(v) => {
          settingsChange("virfice_social_icons_heading", v);
        }}
      />
      <FormInfo
        Text={
          <>
            Your store name and location are coming from the settings. You can
            change or edit them in the{" "}
            <a href={addParams({ menu: "settings" })}>Store/Company Details</a>{" "}
            section in the settings
          </>
        }
      />
    </div>
  );
};

export default GlobalSettings;
