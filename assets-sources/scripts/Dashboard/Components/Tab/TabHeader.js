import React from "react";
import { useTabContext } from "./TabContext";
import { VIRFICE_APP_PREFIX } from "../../../conf";

// TabHeader.js
const TabHeader = ({ index, children }) => {
  const { activeTab, setActiveTab } = useTabContext();

  return (
    <div
      className={`${VIRFICE_APP_PREFIX}-tab-header ${
        activeTab === index ? "active" : ""
      }`}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </div>
  );
};

export default TabHeader;
