import React from "react";
import { pageInitData } from "../../utils";
import Elements from "./Elements";

const pageData = pageInitData;

const ReactPreview = ({ root = pageData.root }) => {
  return (
    <>
      <Elements data={pageData.pageData[root]} />
    </>
  );
};

export default ReactPreview;
