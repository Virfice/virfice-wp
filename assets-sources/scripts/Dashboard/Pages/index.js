import React from "react";
import Landing from "./Landing";
import { hasQueryParamValue } from "../../functions";
import BrandSettings from "./BrandSettings";
import WooEmailList from "./WooEmailList";
import EmailEditor from "./WooEmailList/EmailEditor";
import Settings from "./Settings";
import EmailBuilder from "./Builders/EmailBuilder";

//Need to implement route for every dashboard menu
const Pages = () => {
  if (hasQueryParamValue("menu", "brand-settings")) {
    return <BrandSettings />;
  }
  if (hasQueryParamValue("menu", "woo-email-list")) {
    return <WooEmailList />;
  }
  if (hasQueryParamValue("menu", "woo-email-edit")) {
    return <EmailEditor />;
  }
  if (hasQueryParamValue("menu", "settings")) {
    return <Settings />;
  }
  if (hasQueryParamValue("menu", "builder")) {
    return <EmailBuilder />;
  }
  return <Landing />;
};

export default Pages;
