import React from "react";
import Elements from "./Elements";
import { useSelector } from "react-redux";

const ReactPreview = ({ root }) => {
  const pageData = useSelector((state) => state.builder.data?.pageData);

  return (
    <>
      <Elements data={pageData[root]} />
    </>
  );
};

export default ReactPreview;
