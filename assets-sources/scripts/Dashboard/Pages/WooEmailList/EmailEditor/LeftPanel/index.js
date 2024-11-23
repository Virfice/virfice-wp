import React from "react";
import Card from "@molecules/Card";
import { VIRFICE_APP_PREFIX } from "../../../../../conf";
import TopActionBar from "./TopActionBar";
import Preview from "./Preview";

const LeftPanel = () => {
  return (
    <div style={{ width: 638 }}>
      <Card>
        <div
          className={`${VIRFICE_APP_PREFIX}-flex-col ${VIRFICE_APP_PREFIX}-w-100`}
        >
          <TopActionBar />
          <Preview />
        </div>
      </Card>
    </div>
  );
};

export default LeftPanel;
