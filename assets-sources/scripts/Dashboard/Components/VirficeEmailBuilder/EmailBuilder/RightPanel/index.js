import React, { useEffect, useState } from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import Card from "@molecules/Card";
import { useSelector } from "react-redux";
import {
  getIframe,
  getVirficeElementFromId,
  isBrandSettingsElementSelected,
} from "../utils";
import Heading from "./Heading";
import Divider from "@molecules/Divider";
import Settings from "./Settings";
import ReadyBlocks from "./ReadyBlocks";
import EmailBGSettings from "./EmailBGSettings";
import BrandSettings from "./Settings/BrandSettings";
import { hasQueryParamValue } from "@functions";
// import useChildChangeTracker from "../../../../../Hooks/useChildChangeTracker";

const RightPanel = () => {
  const selectedElementId = useSelector(
    (state) => state.builder?.selectedElementId
  );
  const forceUpdateToogler = useSelector(
    (state) => state.builder?.forceUpdateToogler
  );
  const showReadyBlocks = useSelector(
    (state) => state.builder?.showReadyBlocks
  );
  const [element, setElement] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // const toggler = useChildChangeTracker(element); // Track child changes

  useEffect(() => {
    if (selectedElementId) {
      setElement(getVirficeElementFromId(selectedElementId));
    } else {
      setElement(false);
    }
  }, [selectedElementId, forceUpdateToogler]);

  useEffect(() => {
    if (getIframe().editorWrapper) {
      setLoaded(true);
    }
  }, [getIframe().editorWrapper]);

  if (!loaded) return null;
  return (
    <div className={`${VIRFICE_APP_PREFIX}-builder-right-panel-wrapper`}>
      {/* {!selectedElementId && <Loading />} */}

      <div
        className={`${VIRFICE_APP_PREFIX}-flex-col ${VIRFICE_APP_PREFIX}-gap-20`}
      >
        {isBrandSettingsElementSelected(element) ||
        hasQueryParamValue("menu", "virfice-brand-settings") ? (
          <BrandSettings element={element} />
        ) : (
          <Card className={`${VIRFICE_APP_PREFIX}-flex-col`} style={{ gap: 0 }}>
            {showReadyBlocks && <ReadyBlocks category="*" />}
            {!showReadyBlocks && (
              <>
                {element ? (
                  <>
                    <Heading element={element} />
                    <Divider style={{ marginLeft: -20 }} extraWidth={"40px"} />
                    <Settings element={element} />
                  </>
                ) : (
                  <EmailBGSettings />
                )}
              </>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default RightPanel;
