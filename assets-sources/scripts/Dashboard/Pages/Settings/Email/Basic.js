import React from "react";
import TextField from "@molecules/TextField";
import FormInfo from "@components/FormInfo";
import { FormInfoIllustration } from "@svg-icons";
import { VIRFICE_APP_PREFIX } from "@conf";
import Card from "@molecules/Card";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalSettingsData } from "../globalSettingsSlice";

const Basic = () => {
  const dispatch = useDispatch();
  const changedSettings = useSelector(
    (state) => state.globalSettings["changedSettings-email"]
  );

  const settingsChange = (key, value) => {
    dispatch(
      setGlobalSettingsData({
        key: "changedSettings-email",
        value: { ...changedSettings, [key]: value },
      })
    );
  };

  return (
    <Card>
      <div style={{ width: "100%" }}>
        <div
          className={`${VIRFICE_APP_PREFIX}-form-group`}
          style={{ marginBottom: "16px" }}
        >
          <div className={`title__medium`}>Basic settings</div>
          <div className="body__medium" style={{ maxWidth: 521 }}>
            Configure essential email parameters such as sender information,
            reply-to address, and address.
          </div>
        </div>

        <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
          <div
            className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-8`}
          >
            <TextField
              label={"From name"}
              value={changedSettings["woocommerce_email_from_name"] || ""}
              onChange={(v) => {
                settingsChange("woocommerce_email_from_name", v);
              }}
            />

            <TextField
              label={"From email"}
              value={changedSettings["woocommerce_email_from_address"] || ""}
              onChange={(v) => {
                settingsChange("woocommerce_email_from_address", v);
              }}
            />
          </div>

          <FormInfo
            Text="Be sure to match your name and email to the domain/SMTP settings. Otherwise, it may result in delivery issues."
            Illustration={FormInfoIllustration}
            link="https://virfice.com/change-the-sender-email-address-in-woocommerce/"
          />

          <div
            className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-8`}
          >
            <TextField
              label={"Reply-to name"}
              value={changedSettings["virfice_reply_to_name"] || ""}
              onChange={(v) => {
                settingsChange("virfice_reply_to_name", v);
              }}
            />

            <TextField
              label={"Reply-to email"}
              value={changedSettings["virfice_reply_to_email"] || ""}
              onChange={(v) => {
                settingsChange("virfice_reply_to_email", v);
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Basic;
