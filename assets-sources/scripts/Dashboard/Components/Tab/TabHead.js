import React from "react";
import { useTabContext } from "./TabContext";
import { VIRFICE_APP_PREFIX } from "../../../conf";

// TabHeader.js
const TabHead = ({ children }) => {
  const { activeTab, setActiveTab } = useTabContext();

  return <div className={`${VIRFICE_APP_PREFIX}-tab-head`}>{children}</div>;
};

export default TabHead;
