import React from "react";
import { VIRFICE_APP_PREFIX } from "../../../../conf";
import Textfield from "../../../Molecules/Textfield";

const Email = () => {
  return (
    <div style={{width: '100%'}}>
      <div className={`${VIRFICE_APP_PREFIX}-form-group`} style={{ marginBottom: '16px' }}>
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
            label={"Footer text"}
            value={"changedSettings.woocommerce_email_footer_text"}
            onChange={(v) => {
              // settingsChange("woocommerce_email_footer_text", v);
            }}
          />

          <Textfield
            label={"Footer text"}
            value={"changedSettings.woocommerce_email_footer_text"}
            onChange={(v) => {
              // settingsChange("woocommerce_email_footer_text", v);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Email;
