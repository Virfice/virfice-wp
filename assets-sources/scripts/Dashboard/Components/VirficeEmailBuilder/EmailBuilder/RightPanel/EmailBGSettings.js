import React from "react";
import Divider from "@molecules/Divider";
import PaintField from "@molecules/PaintField";
import { VIRFICE_APP_PREFIX } from "@conf";
import { getElementComputedStyle } from "./Settings/utils";
import { getIframe } from "../utils";

const EmailBGSettings = () => {
  const templateWrapper = getIframe().templateWrapper;
  const body = getIframe().body;

  if (!templateWrapper || !body) return null;
  return (
    <div style={{ width: "100%" }}>
      <div className={`${VIRFICE_APP_PREFIX}-flex`}>
        <div className={`title__medium`}>Email background</div>
      </div>
      <Divider style={{ marginLeft: -20 }} extraWidth={"40px"} />
      <div className={VIRFICE_APP_PREFIX + "-settings-wrapper"}>
        <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
          <PaintField
            label={"Body background"}
            value={getElementComputedStyle(templateWrapper, "background-color")}
            onChange={(v) => {
              templateWrapper.style.backgroundColor = v;
            }}
          />

          <PaintField
            label={"Outer background"}
            value={getElementComputedStyle(body, "background-color")}
            onChange={(v) => {
              body.style.backgroundColor = v;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailBGSettings;
