import React from "react";
import { VIRFICE_APP_PREFIX } from "../../../../../../../../conf";
import basicSections from "../../../../Assets/Sections/Basics";
import wooSections from "../../../../Assets/Sections/Woo";
import {
  cloneElement,
  cloneElementFromString,
  initEmailBuilder,
} from "../../../../utils";

const Body = ({ element, onAdd }) => {
  const addSection = (section) => {
    let template = cloneElementFromString(section.template);
    insertHtmlAfterElement(element, template.outerHTML);
    initEmailBuilder(); //TODO: need to init only for new element
    onAdd();
  };

  const insertHtmlAfterElement = (element, htmlString) => {
    if (!element || !htmlString) return;

    // Insert the HTML string after the target element
    element.insertAdjacentHTML("afterend", htmlString);
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
          <div>{v.title}</div>
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
          <div>{v.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Body;
