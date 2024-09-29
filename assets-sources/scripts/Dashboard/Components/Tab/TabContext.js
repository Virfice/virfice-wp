import React, { createContext, useContext } from "react";

// Context to manage active tab state
export const TabContext = createContext();

export const useTabContext = () => {
  return useContext(TabContext);
};
