import React, { useEffect, useRef } from "react";
import {
  cloneElementFromString,
  getVirficeElementFromId,
  initEmailBuilder,
} from "../../utils";
import { useSelector } from "react-redux";
import { VIRFICE_APP_PREFIX } from "@conf";

const SingleBlock = ({ title, html, preview }) => {
  const wrapperRef = useRef(null);
  const selectedSectionId = useSelector(
    (state) => state.builder?.selectedSectionId
  );

  useEffect(() => {
    //TODO: need to set height
    // wrapperRef.current.height =
  }, []);
  const handleAddReadyBlock = () => {
    const element = cloneElementFromString(html); // This creates the new DOM element.
    const selected_section = getVirficeElementFromId(selectedSectionId); // Retrieve the selected section.

    if (selected_section && element) {
      // Insert the new element after the selected section.
      selected_section.parentNode.insertBefore(
        element,
        selected_section.nextSibling
      );
      initEmailBuilder(); //TODO: need to init only for new element
    } else {
      console.error(
        "Failed to find the selected section or the element is null."
      );
    }
  };
  return (
    <div className={VIRFICE_APP_PREFIX + "-single-ready-block"}>
      <div
        className={VIRFICE_APP_PREFIX + "-single-ready-block-html-wrapper"}
        onClick={handleAddReadyBlock}
        // dangerouslySetInnerHTML={{ __html: html }}
      >
        <img src={preview} />
      </div>
    </div>
  );
};

export default SingleBlock;
