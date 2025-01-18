import React from "react";
import DefalutEditor from "./DefaultEditor";
import { hasQueryParamValue } from "@functions";
import VirficeEditor from "./VirficeEditor";
import WooEmailPreview from "./WooEmailPreview";

const EmailEditor = () => {
  return (
    <>
      {hasQueryParamValue("menu", "woo-email-edit") && <DefalutEditor />}
      {hasQueryParamValue("menu", "woo-email-edit-virfice") && (
        <VirficeEditor />
      )}
      {hasQueryParamValue("menu", "woo-email-edit-preview-virfice") && (
        <WooEmailPreview />
      )}
    </>
  );
};
export default EmailEditor;
