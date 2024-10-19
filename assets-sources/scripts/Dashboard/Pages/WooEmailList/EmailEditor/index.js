import React from "react";
import DefalutEditor from "./DefaultEditor";
import { hasQueryParamValue } from "../../../../functions";
import VirficeEditor from "./VirficeEditor";

const EmailEditor = () => {
  return (
    <>
      {hasQueryParamValue("menu", "woo-email-edit") && <DefalutEditor />}
      {hasQueryParamValue("menu", "woo-email-edit-virfice") && (
        <VirficeEditor />
      )}
    </>
  );
};
export default EmailEditor;
