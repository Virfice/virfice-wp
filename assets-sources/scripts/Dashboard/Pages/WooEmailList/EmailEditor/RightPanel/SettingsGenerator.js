import React from "react";
import TextField from "@molecules/TextField";
import { VIRFICE_APP_PREFIX } from "../../../../../conf";
import { useSelector, useDispatch } from "react-redux";
import SelectField from "@molecules/SelectField";
import { setWooEmailSingleData } from "../wooEmailSingleSlice";
import { getSelectOptionsValueFromOptions } from "../../../../../functions";
const escapedHtmlToOriginal = (text) => {
  if (!text) return "";
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
};
const getSelectOptionsFromObject = (options) => {
  return Object.keys(options).map((key, i) => ({
    value: key,
    title: options[key],
  }));
};
const SettingsGenerator = () => {
  const dispatch = useDispatch();
  let form_fields = useSelector(
    (state) => state.wooEmailSingle?.email?.settings?.form_fields
  );
  let changedSettings = useSelector(
    (state) => state.wooEmailSingle?.changedSettings
  );

  if (!form_fields) return;

  const settingsChange = (key, value) => {
    dispatch(
      setWooEmailSingleData({
        key: "changedSettings",
        value: { ...changedSettings, [key]: value },
      })
    );
  };
  return (
    <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
      <div className={`title__medium`}>Settings</div>
      {Object.keys(form_fields).map((key, i) => {
        let setting = form_fields[key];
        switch (setting.type) {
          case "textarea":
          case "text": {
            return (
              <TextField
                placeholder={setting.placeholder}
                label={setting.title}
                value={changedSettings[key]}
                onChange={(v) => {
                  settingsChange(key, v);
                }}
                key={key}
                multiline={setting.type === "textarea" ? 3 : false}
                helpText={
                  <span
                    dangerouslySetInnerHTML={{
                      __html: escapedHtmlToOriginal(setting.description),
                    }}
                  ></span>
                }
              />
            );
          }

          case "checkbox": {
            return (
              <SelectField
                label={setting.title}
                value={getSelectOptionsValueFromOptions(
                  [
                    { value: "yes", title: "Enable" },
                    { value: "no", title: "Disable" },
                  ],
                  changedSettings[key]
                )}
                options={[
                  { value: "yes", title: "Enable" },
                  { value: "no", title: "Disable" },
                ]}
                onChange={(v) => {
                  settingsChange(key, v.value);
                }}
                key={key}
                helpText={
                  <span
                    dangerouslySetInnerHTML={{
                      __html: escapedHtmlToOriginal(setting.description),
                    }}
                  ></span>
                }
              />
            );
          }
          case "select": {
            return (
              <SelectField
                label={setting.title}
                value={getSelectOptionsValueFromOptions(
                  getSelectOptionsFromObject(setting.options),
                  changedSettings[key]
                )}
                options={getSelectOptionsFromObject(setting.options)}
                onChange={(v) => {
                  settingsChange(key, v.value);
                }}
                key={key}
                helpText={
                  <span
                    dangerouslySetInnerHTML={{
                      __html: escapedHtmlToOriginal(setting.description),
                    }}
                  ></span>
                }
              />
            );
          }
          default: {
            return "Not implement => " + key;
          }
        }
      })}
    </div>
  );
};

export default SettingsGenerator;
