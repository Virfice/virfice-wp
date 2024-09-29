import React, { useState } from "react";
import { TabContext } from "./TabContext";
import { VIRFICE_APP_PREFIX } from "../../../conf";

// Tab.js
const Tab = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0); // Store the index of the active tab

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={VIRFICE_APP_PREFIX + "-tab-container"}>{children}</div>
    </TabContext.Provider>
  );
};

export default Tab;
