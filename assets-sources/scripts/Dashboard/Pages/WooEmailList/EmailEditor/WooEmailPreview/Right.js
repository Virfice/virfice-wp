import React from "react";
import TextField from "@molecules/TextField";
import Button from "@molecules/Button";
import { VIRFICE_APP_PREFIX } from "@conf";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalSettingsData } from "../../../Settings/globalSettingsSlice";
import { escapedHtmlToOriginal } from "../RightPanel/SettingsGenerator";
import { setWooEmailSingleData } from "../wooEmailSingleSlice";
import { DevicesIcon } from "@svg-icons";

const Right = ({ onPreviewButtonClick }) => {
  const dispatch = useDispatch();
  let form_fields = useSelector(
    (state) => state.wooEmailSingle?.email?.settings?.form_fields
  );
  const changedSettings = useSelector(
    (state) => state.globalSettings["changedSettings-email"]
  );
  let wooEmailSingleChangedSettings = useSelector(
    (state) => state.wooEmailSingle?.changedSettings
  );

  if (!form_fields) return;

  const settingsChange = (key, value) => {
    dispatch(
      setGlobalSettingsData({
        key: "changedSettings-email",
        value: { ...changedSettings, [key]: value },
      })
    );
  };
  const wooEmailSingleSettingsChange = (key, value) => {
    dispatch(
      setWooEmailSingleData({
        key: "changedSettings",
        value: { ...wooEmailSingleChangedSettings, [key]: value },
      })
    );
  };
  return (
    <div style={{ flexGrow: 1 }}>
      <div style={{ marginBottom: 24 }}>
        <Button
          small
          type={"secondary"}
          title="Preview Email"
          onClick={onPreviewButtonClick}
          leftIcon={<DevicesIcon />}
        />
      </div>
      <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
        <TextField
          placeholder={
            form_fields?.subject?.placeholder ||
            form_fields?.subject_full?.placeholder
          }
          label={"Subject"}
          value={wooEmailSingleChangedSettings["subject"] || ""}
          onChange={(v) => {
            wooEmailSingleSettingsChange("subject", v);
          }}
          multiline={5}
          helpText={
            <span
              dangerouslySetInnerHTML={{
                __html: escapedHtmlToOriginal(
                  form_fields?.subject?.description ||
                    form_fields?.subject_full?.description
                ),
              }}
            ></span>
          }
        />

        <TextField
          value={wooEmailSingleChangedSettings["virfice_preview_text"] || ""}
          label={"Preview text"}
          multiline={5}
          onChange={(v) => {
            wooEmailSingleSettingsChange("virfice_preview_text", v);
          }}
        />

        <div className={`${VIRFICE_APP_PREFIX}-flex`} style={{ gap: 16 }}>
          <TextField
            label={"Sender email"}
            value={changedSettings["woocommerce_email_from_address"] || ""}
            onChange={(v) => {
              settingsChange("woocommerce_email_from_address", v);
            }}
          />
          <TextField
            label={"Sender name"}
            value={changedSettings["woocommerce_email_from_name"] || ""}
            onChange={(v) => {
              settingsChange("woocommerce_email_from_name", v);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Right;
