import React from "react";
import Landing from "./Landing";
import { hasQueryParamValue } from "@functions";
import WooEmailList from "./WooEmailList";
import Settings from "./Settings";
import EmailEditor from "./WooEmailList/EmailEditor";
import VirficeBrandSettings from "./VirficeBrandSettings";
import VirficeTemplateEditor from "./VirficeTemplateEditor";

//Need to implement route for every dashboard menu
const Pages = () => {
  // if (hasQueryParamValue("menu", "brand-settings")) {
  //   return <BrandSettings />;
  // }
  if (hasQueryParamValue("menu", "virfice-brand-settings")) {
    return <VirficeBrandSettings />;
  }
  if (hasQueryParamValue("menu", "woo-email-list")) {
    return <WooEmailList />;
  }
  if (
    hasQueryParamValue("menu", "woo-email-edit") ||
    hasQueryParamValue("menu", "woo-email-edit-virfice") ||
    hasQueryParamValue("menu", "woo-email-edit-preview-virfice")
  ) {
    return <EmailEditor />;
  }

  if (hasQueryParamValue("menu", "virfice-template-edit")) {
    return <VirficeTemplateEditor />;
  }

  if (hasQueryParamValue("menu", "settings")) {
    return <Settings />;
  }
  return <Landing />;
};

export default Pages;
