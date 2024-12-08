import React, { useEffect } from "react";
// import Elements from "./Elements";
import { useSelector } from "react-redux";
import { VIRFICE_APP_PREFIX } from "@conf";
import EditorControls from "./EditorControls";
import { initEmailBuilder } from "../../utils";

const ReactPreview = ({ root }) => {
  const html = useSelector((state) => state.builder.html);
  const changedSettings = useSelector(
    (state) => state.virficeBrandSettings.changedSettings
  );

  useEffect(() => {
    initEmailBuilder();
  }, [html]);
  const rawCss = `
    #${VIRFICE_APP_PREFIX}-editor-wrapper{
      color: ${changedSettings.email_body_text};
    }
    #${VIRFICE_APP_PREFIX}-editor-wrapper button{
      background-color: ${changedSettings.email_body_button_bg};
      color: ${changedSettings.email_body_button_color};
    }
    #${VIRFICE_APP_PREFIX}-editor-wrapper a{
      background-color: ${changedSettings.email_body_button_bg};
      color: ${changedSettings.email_link_color};
    }
  `;
  return (
    <div
      className={`${VIRFICE_APP_PREFIX}-editor-wrapper`}
      id={`${VIRFICE_APP_PREFIX}-editor-wrapper`}
      style={{ backgroundColor: changedSettings.email_outer_background_color }}
    >
      <style dangerouslySetInnerHTML={{ __html: rawCss }} />
      <div
        className={`${VIRFICE_APP_PREFIX}-template-wrapper`}
        id={VIRFICE_APP_PREFIX + "-email-preview"}
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          backgroundColor: changedSettings.email_background_color,
          width: changedSettings.email_body_width,
        }}
      ></div>
      <EditorControls />
    </div>
  );
};

export default ReactPreview;
