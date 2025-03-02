import React from "react";
import { useTabContext } from "./TabContext";
import { VIRFICE_APP_PREFIX } from "@conf";

// TabContent.js
const TabContent = ({ index, children }) => {
  const { activeTab } = useTabContext();

  return activeTab === index ? (
    <div className={VIRFICE_APP_PREFIX + "-tab-content"}>{children}</div>
  ) : null; // Render null if it's not the active tab
};

export default TabContent;
