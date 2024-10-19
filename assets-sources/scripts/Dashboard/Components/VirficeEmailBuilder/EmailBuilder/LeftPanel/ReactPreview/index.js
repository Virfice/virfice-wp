import React, { useEffect } from "react";
// import Elements from "./Elements";
import { useSelector } from "react-redux";
import { VIRFICE_APP_PREFIX } from "../../../../../../conf";
import EditorControls from "./EditorControls";
import { initEmailBuilder } from "../../utils";

const ReactPreview = ({ root }) => {
  const html = useSelector((state) => state.builder.html);
  useEffect(() => {
    initEmailBuilder();
  }, [html]);
  return (
    <div className={`${VIRFICE_APP_PREFIX}-editor-wrapper`}>
      <div
        className={`${VIRFICE_APP_PREFIX}-template-wrapper`}
        id={VIRFICE_APP_PREFIX + "-email-preview"}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      <EditorControls />
    </div>
  );
};

export default ReactPreview;
