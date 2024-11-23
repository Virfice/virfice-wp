import React from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import Card from "@molecules/Card";
import OrderSelection from "./OrderSelection";
import SettingsGenerator from "./SettingsGenerator";

const RightPanel = () => {
  return (
    <div style={{ width: 380 }}>
      <div
        className={`${VIRFICE_APP_PREFIX}-flex-col ${VIRFICE_APP_PREFIX}-gap-20 ${VIRFICE_APP_PREFIX}-sticky-top-110`}
      >
        <Card>
          <OrderSelection />
        </Card>
        <Card>
          <SettingsGenerator />
        </Card>
      </div>
    </div>
  );
};

export default RightPanel;
