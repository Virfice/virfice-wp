import React from "react";
import Textfield from "../../../Molecules/Textfield";
import FormInfo from "../../../Components/FormInfo";
import { FormInfoIllustration } from "../../../icons";
import { VIRFICE_APP_PREFIX } from "../../../../conf";
import Card from "../../../Molecules/Card";

const Basic = () => {
  return (
    <Card>
      <div style={{ width: "100%" }}>
        <div
          className={`${VIRFICE_APP_PREFIX}-form-group`}
          style={{ marginBottom: "16px" }}
        >
          <div className={`title__medium`}>WooCommerce email templates</div>
          <div className="body__medium" style={{ maxWidth: 520 }}>
            Configure essential email parameters such as sender information,
            reply-to address, and address.
          </div>
        </div>

        <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
          <div
            className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-8`}
          >
            <Textfield
              label={"From name"}
              value={""}
              onChange={(v) => {
                // settingsChange("woocommerce_email_footer_text", v);
              }}
            />

            <Textfield
              label={"From email"}
              value={""}
              onChange={(v) => {
                // settingsChange("woocommerce_email_footer_text", v);
              }}
            />
          </div>

          <FormInfo
            text="Be sure to match your name and email to the domain/SMTP settings. Otherwise, it may result in delivery issues."
            Illustration={FormInfoIllustration}
            link='https://www.virfice.com/customize-woocommerce-emails/'
          />

          <div
            className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-8`}
          >
            <Textfield
              label={"Reply-to name"}
              value={""}
              onChange={(v) => {
                // settingsChange("woocommerce_email_footer_text", v);
              }}
            />

            <Textfield
              label={"Reply-to email"}
              value={""}
              onChange={(v) => {
                // settingsChange("woocommerce_email_footer_text", v);
              }}
            />
          </div>
          <Textfield
              label={"Address"}
              value={""}
              onChange={(v) => {
                // settingsChange("woocommerce_email_footer_text", v);
              }}
              multiline={5}
            />

<div
            className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-8`}
          >
            <Textfield
              label={"Reply-to name"}
              value={""}
              onChange={(v) => {
                // settingsChange("woocommerce_email_footer_text", v);
              }}
            />

            <Textfield
              label={"Reply-to email"}
              value={""}
              onChange={(v) => {
                // settingsChange("woocommerce_email_footer_text", v);
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Basic;
