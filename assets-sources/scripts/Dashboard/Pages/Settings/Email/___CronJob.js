import React from "react";
import TextField from "@molecules/TextField";
import FormInfo from "@components/FormInfo";
import { FormInfoIllustration } from "@svg-icons";
import { VIRFICE_APP_PREFIX } from "@conf";
import Card from "@molecules/Card";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalSettingsData } from "../globalSettingsSlice";
import SelectField from "@molecules/SelectField";
import { getSelectOptionsValueFromOptions } from "@functions";

const frequency_email_options = [
  { value: 10, title: "10 Emails" },
  { value: 12, title: "12 Emails" },
  { value: 15, title: "15 Emails" },
  { value: 20, title: "20 Emails" },
];

const frequency_delay_options = [
  { value: 1, title: "1 Minute" },
  { value: 5, title: "5 Minutes" },
  { value: 10, title: "10 Minutes" },
  { value: 20, title: "20 Minutes" },
];

const CronJob = () => {
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
          <div className={`title__medium`}>CRON job</div>
          <div className="body__medium" style={{ maxWidth: 521 }}>
            Set the number of emails you want to send from your store. Specify
            the frequency of emails per second or per minute.
          </div>
        </div>

        <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
          <label className="body__medium" style={{ marginBottom: -8 }}>
            Sending frequency
          </label>

          <div
            className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-8`}
          >
            <SelectField
              value={getSelectOptionsValueFromOptions(
                frequency_email_options,
                changedSettings["virfice_sending_frequency_email"]
              )}
              options={frequency_email_options}
              onChange={(v) => {
                settingsChange("virfice_sending_frequency_email", v.value);
              }}
            />
            <SelectField
              value={getSelectOptionsValueFromOptions(
                frequency_delay_options,
                changedSettings["virfice_sending_frequency_delay"]
              )}
              options={frequency_delay_options}
              onChange={(v) => {
                settingsChange("virfice_sending_frequency_delay", v.value);
              }}
            />
          </div>
          <FormInfo
            Text="The number of emails sent per minute can vary. Set the number between 5 and 20 emails per minute for optimal delivery rates and to avoid potential issues with spam filters."
            Illustration={FormInfoIllustration}
            link="https://www.virfice.com/email-sending-frequency-for-woocommerce-emails/"
          />
        </div>
      </div>
    </Card>
  );
};

export default CronJob;
