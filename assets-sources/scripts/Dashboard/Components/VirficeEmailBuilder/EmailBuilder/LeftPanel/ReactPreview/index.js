import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { VIRFICE_APP_PREFIX } from "@conf";
import EditorControls from "./EditorControls";
import { getIframe, initEmailBuilder } from "../../utils";

const defaultStyle = `<style>
  html{
    padding-bottom: 280px;
  }
  html, body, .virfice-editor-wrapper{
    min-height: 100vh;
  }
</style>`;

const ReactPreview = () => {
  const iframeRef = useRef(null);
  const [iframeBody, setIframeBody] = useState(null);
  const [showControl, setShowControl] = useState(false);

  const html = useSelector((state) => state.builder.html);
  const global_style = useSelector((state) => state.builder.global_style);
  const changedSettings = useSelector(
    (state) => state.virficeBrandSettings.changedSettings
  );

  useEffect(() => {
    if (getIframe()?.document) {
      initEmailBuilder();
      setShowControl(true);
    }
  }, [getIframe()?.document]);

  return (
    <>
      {/* IFRAME where React Portal will inject the content */}
      <div
        className={`${VIRFICE_APP_PREFIX}-editor-wrapper`}
        id={`${VIRFICE_APP_PREFIX}-editor-wrapper`}
      >
        <iframe
          ref={iframeRef}
          srcDoc={`<html><head></head><body>${defaultStyle}</body></html>`}
          onLoad={() => {
            if (iframeRef.current?.contentWindow) {
              const iframeDocument = iframeRef.current.contentWindow.document;
              setIframeBody(iframeDocument.body);
              setTimeout(() => {
                initEmailBuilder();
              }, 100);
            }
          }}
        />
        {showControl && <EditorControls />}
      </div>

      {/* React Portal to inject content inside the IFRAME */}
      {iframeBody &&
        ReactDOM.createPortal(
          <>
            <div
              className={`${VIRFICE_APP_PREFIX}-editor-wrapper`}
              id={`${VIRFICE_APP_PREFIX}-editor-wrapper`}
            >
              <div
                id={`${VIRFICE_APP_PREFIX}-global-style`}
                dangerouslySetInnerHTML={{ __html: global_style }}
              />
              <div
                className={`${VIRFICE_APP_PREFIX}-template-wrapper`}
                id={`${VIRFICE_APP_PREFIX}-email-preview`}
                dangerouslySetInnerHTML={{ __html: html }}
                style={{
                  backgroundColor: changedSettings.email_background_color,
                  width: changedSettings.email_body_width,
                }}
              />
            </div>
          </>,
          iframeBody
        )}
    </>
  );
};

export default ReactPreview;
