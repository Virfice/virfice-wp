import React from "react";
import TextField from "@molecules/TextField";
import { VIRFICE_APP_PREFIX } from "../../../../conf";
import Card from "@molecules/Card";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalSettingsData } from "../globalSettingsSlice";

const StoreDetails = () => {
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
          <div className={`title__medium`}>Store/company details</div>
          <div className="body__medium" style={{ maxWidth: 521 }}>
            The information provided will automatically generate compliant email
            footers in accordance with the CAN-SPAM Act and international
            anti-spam laws.
          </div>
        </div>

        <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
          <TextField
            label={"Store/company name"}
            value={changedSettings["virfice_store_name"] || ""}
            onChange={(v) => {
              settingsChange("virfice_store_name", v);
            }}
          />
          <TextField
            label={"Website URL"}
            value={changedSettings["virfice_website_url"] || ""}
            onChange={(v) => {
              settingsChange("virfice_website_url", v);
            }}
          />
          <TextField
            label={"Address"}
            value={changedSettings["virfice_address"] || ""}
            onChange={(v) => {
              settingsChange("virfice_address", v);
            }}
            multiline={5}
          />

          <div
            className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-8`}
          >
            <TextField
              label={"Country"}
              value={changedSettings["virfice_country"] || ""}
              onChange={(v) => {
                settingsChange("virfice_country", v);
              }}
            />

            <TextField
              label={"City"}
              value={changedSettings["virfice_city"] || ""}
              onChange={(v) => {
                settingsChange("virfice_city", v);
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StoreDetails;
