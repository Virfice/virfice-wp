import React from "react";
import Textfield from "../../../../Molecules/Textfield";
import { VIRFICE_APP_PREFIX } from "../../../../../conf";
import { useSelector, useDispatch } from "react-redux";
import Selectfield from "../../../../Molecules/Selectfield";
import { setWooEmailSingleData } from "../wooEmailSingleSlice";

const getSelectOptionsFromObject = (options) =>{
    return Object.keys(options).map((key, i) => ({
        value: key,
        title: options[key],
      }));
}
const getSelectOptionsValueFromOptions = (options, selectedValue) =>{
    let obj = {value: '', title: 'Select'};
    options.forEach(option => {
        if(option.value === selectedValue){
            obj = option;
        }
    });
    return obj;
}
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
              <Textfield
                placeholder={setting.description}
                label={setting.title}
                value={changedSettings[key]}
                onChange={(v) => {
                  settingsChange(key, v);
                }}
                key={key}
                multiline={setting.type === "textarea"}
              />
            );
          }

          case "checkbox": {
            return (
              <Selectfield
                label={setting.title}
                value={getSelectOptionsValueFromOptions([
                    { value: "yes", title: "Enable" },
                    { value: "no", title: "Disable" },
                  ] , changedSettings[key])}
                options={[
                  { value: "yes", title: "Enable" },
                  { value: "no", title: "Disable" },
                ]}
                onChange={(v) => {
                  settingsChange(key, v.value);
                }}
                key={key}
              />
            );
          }
          case "select": {
            return (
              <Selectfield
                label={setting.title}
                value={getSelectOptionsValueFromOptions(getSelectOptionsFromObject(setting.options) , changedSettings[key])}
                options={getSelectOptionsFromObject(setting.options)}
                onChange={(v) => {
                  settingsChange(key, v.value);
                }}
                key={key}
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
