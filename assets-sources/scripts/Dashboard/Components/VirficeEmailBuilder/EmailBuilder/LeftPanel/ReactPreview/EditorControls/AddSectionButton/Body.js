import React from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import basicSections from "../../../../Assets/Sections/Basics";
import wooSections from "../../../../Assets/Sections/Woo";
import {
  cloneElement,
  cloneElementFromString,
  getVirficeAttr,
  initEmailBuilder,
  selectElementUsingID,
} from "../../../../utils";

const Body = ({ element, onAdd }) => {
  const templateWrapper = document.getElementById("virfice-email-preview");
  const addSection = (section) => {
    let template = cloneElementFromString(section.template);
    if (element) {
      insertHtmlAfterElement(element, template.outerHTML);
    } else {
      templateWrapper.append(template);
    }
    initEmailBuilder(); //TODO: need to init only for new element
    onAdd();

    selectElementUsingID(getVirficeAttr(template, "id"));
  };

  const insertHtmlAfterElement = (element, htmlString) => {
    if (!htmlString) return;

    if (element) {
      // Insert the HTML string after the target element
      element.insertAdjacentHTML("afterend", htmlString);
    } else {
      templateWrapper.innerHTML = htmlString;
    }
  };

  return (
    <div className={VIRFICE_APP_PREFIX + "-add-section-body"}>
      {basicSections.map((v, i) => (
        <div
          className={VIRFICE_APP_PREFIX + "-item"}
          onClick={() => {
            addSection(v);
          }}
          key={i}
        >
          <div>{v.icon}</div>
          <div className={VIRFICE_APP_PREFIX + "-item-title"}>{v.title}</div>
        </div>
      ))}

      {wooSections.map((v, i) => (
        <div
          className={VIRFICE_APP_PREFIX + "-item"}
          onClick={() => {
            addSection(v);
          }}
          key={i}
        >
          <div>{v.icon}</div>
          <div className={VIRFICE_APP_PREFIX + "-item-title"}>{v.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Body;
