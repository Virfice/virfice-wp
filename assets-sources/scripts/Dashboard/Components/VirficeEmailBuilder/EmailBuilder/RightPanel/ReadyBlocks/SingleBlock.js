import React from "react";
import {
  cloneElementFromString,
  getVirficeElementFromId,
  initEmailBuilder,
} from "../../utils";
import { useSelector } from "react-redux";

const SingleBlock = ({ title, html }) => {
  const selectedSectionId = useSelector(
    (state) => state.builder?.selectedSectionId
  );
  const handleAddReadyBlock = () => {
    console.log(html);
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
    <div
      onClick={handleAddReadyBlock}
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};

export default SingleBlock;
