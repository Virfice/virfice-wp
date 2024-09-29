import React, { useEffect, useState } from "react";
import { VIRFICE_APP_PREFIX } from "../../../../../../../conf";
import { useSelector } from "react-redux";
import { getVirficeElementFromId } from "../../../utils";
import Border from "./Border";

const EditorControls = () => {
  const selectedElementId = useSelector(
    (state) => state.builder?.selectedElementId
  );
  const [element, setElement] = useState(false);

  useEffect(() => {
    if (selectedElementId) {
      setElement(getVirficeElementFromId(selectedElementId));
    }
  }, [selectedElementId]);

  if (!element) return null;

  return (
    <div className={VIRFICE_APP_PREFIX + "-element-controls"}>
      <Border element={element} />
    </div>
  );
};

export default EditorControls;
