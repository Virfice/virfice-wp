import React from "react";
import Textfield from "../../../Molecules/Textfield";
import EmailSelection from "./EmailSelection";
import { VIRFICE_APP_PREFIX } from "../../../../conf";
import Card from "../../../Molecules/Card";
import GlobalSettings from "./GlobalSettings";
import EmailSenderOptions from "./EmailSenderOptions";

const RightPanel = () => {
  return (
    <div style={{ width: 380 }}>
      <div
        className={`${VIRFICE_APP_PREFIX}-flex-col ${VIRFICE_APP_PREFIX}-gap-20`}
      >
        <Card>
          <EmailSelection />
        </Card>
        <Card>
          <EmailSenderOptions />
        </Card>
        <Card>
          <GlobalSettings />
        </Card>
      </div>
    </div>
  );
};

export default RightPanel;
