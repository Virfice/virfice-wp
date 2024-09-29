import React from "react";
import Card from "../../../../Molecules/Card";
import TopActionBar from "../../../WooEmailList/EmailEditor/LeftPanel/TopActionBar";
import Preview from "../../../WooEmailList/EmailEditor/LeftPanel/Preview";
import { VIRFICE_APP_PREFIX } from "../../../../../conf";
import ReactPreview from "./ReactPreview";

const LeftPanel = () => {
  return (
    <div style={{ width: 638 }}>
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
