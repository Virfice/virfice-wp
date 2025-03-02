import React, { useEffect, useRef } from "react";
import {
  cloneElementFromString,
  getIframe,
  getVirficeAttr,
  getVirficeElementFromId,
  initEmailBuilder,
  scrollToCanvasElement,
  selectElementUsingID,
} from "../../utils";
import Badge from "@molecules/Badge";
import { useSelector } from "react-redux";
import { VIRFICE_APP_PREFIX } from "@conf";

const SingleBlock = ({ title, html, preview, isComingSoon }) => {
  const wrapperRef = useRef(null);
  const changedSettings = useSelector(
    (state) => state.virficeBrandSettings.changedSettings
  );

  const selectedSectionId = useSelector(
    (state) => state.builder?.selectedSectionId
  );
  const hoveredSectionId = useSelector(
    (state) => state.builder?.hoveredSectionId
  );

  useEffect(() => {
    //TODO: need to set height
    // wrapperRef.current.height =
  }, []);
  const handleAddReadyBlock = () => {
    if (isComingSoon) return;

    // Convert the HTML string into a DocumentFragment (multiple elements)
    const fragment = document.createElement("div");
    fragment.innerHTML = html;
    let elements = Array.from(fragment.children).map(applyShortCode); // Apply shortcode to each child

    if (elements.length === 0) return; // If no elements, exit.

    const selected_section = getVirficeElementFromId(
      hoveredSectionId || selectedSectionId
    ); // Retrieve the selected section.

    if (selected_section) {
      // Insert all elements after the selected section
      elements.reverse().forEach((el) => {
        selected_section.parentNode.insertBefore(
          el,
          selected_section.nextSibling
        );
      });
    } else {
      // Append all elements to the template wrapper
      const templateWrapper = getIframe().templateWrapper;
      elements.forEach((el) => templateWrapper.append(el));
    }

    initEmailBuilder(); //TODO: Need to init only for new elements

    // Select and scroll to the first inserted element
    const firstElement = elements[0];
    if (firstElement) {
      const vID = getVirficeAttr(firstElement, "id");
      selectElementUsingID(vID);

      scrollToCanvasElement({
        element: getVirficeElementFromId(vID),
        parent: getIframe().body,
      });
    }
  };

  const applyShortCode = (element) => {
    if (
      changedSettings.logo &&
      element.querySelector('[virfice-short_code="store_logo"]')
    ) {
      element.querySelector('[virfice-short_code="store_logo"]').src =
        changedSettings.logo;
    }
    return element;
  };
  return (
    <div className={VIRFICE_APP_PREFIX + "-single-ready-block"}>
      <div
        className={VIRFICE_APP_PREFIX + "-single-ready-block-html-wrapper"}
        onClick={handleAddReadyBlock}
        // dangerouslySetInnerHTML={{ __html: html }}
        style={{
          position: "relative",
          cursor: isComingSoon ? "not-allowed" : "default",
        }}
      >
        {isComingSoon && (
          <div style={{ position: "absolute", top: 4, right: 4 }}>
            <Badge type="warning" title="Coming Soon" />
          </div>
        )}
        <img src={preview} />
      </div>
    </div>
  );
};

export default SingleBlock;
