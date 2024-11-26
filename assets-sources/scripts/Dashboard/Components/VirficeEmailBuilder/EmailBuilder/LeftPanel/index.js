import React from "react";
import Card from "@molecules/Card";
import { VIRFICE_APP_PREFIX } from "@conf";
import ReactPreview from "./ReactPreview";
import TopActionBar from "./TopActionBar";

const LeftPanel = () => {
  return (
    <div
      className={`${VIRFICE_APP_PREFIX}-builder-left-panel-wrapper`}
      id={`${VIRFICE_APP_PREFIX}-builder-left-panel-wrapper`}
    >
      <Card>
        <div
          className={`${VIRFICE_APP_PREFIX}-flex-col ${VIRFICE_APP_PREFIX}-w-100`}
        >
          <TopActionBar />
          {/* <Preview /> */}
          <ReactPreview />
        </div>
      </Card>
    </div>
  );
};

export default LeftPanel;
