import { VIRFICE_APP_PREFIX } from "@conf";
import { dispatchDashboardAction, generateRandomId } from "@functions";
import {
  onHoverSection,
  onSelectElement,
  onSelectSection,
  setBuilderData,
} from "../builderSlice";

export const getIframe = () => {
  const editorWrapper = document.getElementById("virfice-editor-wrapper");

  if (!editorWrapper) {
    return {};
  }

  const iframe = editorWrapper.querySelector("iframe");

  if (!iframe || !iframe.contentWindow) {
    console.error("Iframe not found or not loaded yet");
    return {};
  }
  const obj = {
    iframe,
    document: iframe.contentWindow.document,
    body: iframe.contentWindow.document.body,
    templateWrapper: iframe.contentWindow.document.getElementById(
      "virfice-email-preview"
    ),
    editorWrapper: iframe.contentWindow.document.getElementById(
      "virfice-editor-wrapper"
    ),
    window: iframe.contentWindow,
  };
  return obj;
};

export const initEmailBuilder = () => {
  const iframeData = getIframe();

  if (!iframeData) return;
  const wrapper = iframeData.templateWrapper;
  if (!wrapper) return;

  setTimeout(() => {
    initAllElementsCommonEvents(wrapper);
  }, 100);
};

const initAllElementsCommonEvents = (wrapper) => {
  let allEle = wrapper.querySelectorAll(`[${VIRFICE_APP_PREFIX}-ele_type]`);
  allEle.forEach((ele, i) => {
    initClickEvent(ele);
    initHoverEvent(ele);
    // initEmptyElement(ele);//not used
  });

  // Disable all anchor element clicks
  let allAnchors = wrapper.querySelectorAll("a");
  allAnchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent navigation
      event.stopPropagation(); // Stop event from bubbling up
    });
  });

  const editorWrapper = getIframe().editorWrapper;
  editorWrapper.addEventListener("click", () => {
    dispatchDashboardAction(onSelectElement, null);
  });
};

const initClickEvent = (ele) => {
  ele.addEventListener("click", (e) => {
    e.stopPropagation();
    // console.log(e.target.tagName);
    // let validEle = e.target;
    let vID = getVirficeAttr(ele, "id");
    selectElementUsingID(vID);
  });
};

export const selectElementUsingID = (id) => {
  let ele = getVirficeElementFromId(id);
  let validEle = null;
  if (!id) {
    validEle = getParentElement(ele);
  } else {
    validEle = ele;
  }

  if (!isSettingsEnabled(validEle)) {
    //thats mean single basic element selected. like: image, text, button
    validEle = validEle.querySelector(`[${VIRFICE_APP_PREFIX}-ele_type]`);
  }

  if (validEle) {
    dispatchDashboardAction(onSelectElement, getVirficeAttr(validEle, "id"));
  }

  if (ele) {
    let sectionEle = ele;
    if (getVirficeAttr(sectionEle, "ele_type") !== "section") {
      sectionEle = getParentSection(sectionEle);
    }
    dispatchDashboardAction(onSelectSection, getVirficeAttr(sectionEle, "id"));
  }
};

const initHoverEvent = (ele) => {
  ele.addEventListener("mouseover", (e) => {
    e.stopPropagation();

    if (window.AddSectionButtonOpen) return;
    const sectionEle = getParentSection(ele);
    dispatchDashboardAction(onHoverSection, getVirficeAttr(sectionEle, "id"));
  });

  let timeoutId; // Declare timeoutId variable globally or at the top of your function
  // Add the event listener to `ele`
  ele.addEventListener("mouseleave", (e) => {
    e.stopPropagation(); // Prevent event bubbling
    // Get the controls element
    // const controlsElement = document.querySelector(".virfice-right-control");

    // controlsElement.addEventListener("mouseover", (e) => {
    //   clearTimeout(timeoutId);
    // });

    // controlsElement.addEventListener("mouseleave", (e) => {
    //   // Set timeout to remove the hover section after 2 seconds delay
    //   timeoutId = setTimeout(() => {
    //     dispatchDashboardAction(onHoverSection, false);
    //   }, 1000);
    // });

    // Set timeout to remove the hover section after 2 seconds delay
    // timeoutId = setTimeout(() => {
    //   dispatchDashboardAction(onHoverSection, false);
    // }, 2000);
  });
};

// export const initEmptyElement = (ele) => {
//   const excludedEle = [
//     "a",
//     "p",
//     "body",
//     "html",
//     "h1",
//     "h2",
//     "h3",
//     "h4",
//     "h5",
//     "h6",
//     "span",
//     "img",
//     "input",
//     "textarea",
//     "label",
//   ];

//   if (excludedEle.includes(ele.tagName.toLowerCase())) return;

//   if (!ele.children.length) {
//     ele.innerHTML = `
//           <span style="font-size: 82px;line-height: 90px;">+</span>
//     `;
//     console.log("added");
//   }
// };

export const getVirficeElementFromId = (elementId) => {
  const wrapper = getIframe().document.getElementById(
    VIRFICE_APP_PREFIX + "-email-preview"
  );
  if (!wrapper) return;
  return wrapper.querySelector(`[${VIRFICE_APP_PREFIX}-id="${elementId}"]`);
};

export const getVirficeAttr = (element, attr) => {
  if (!element) return;
  return element.getAttribute(VIRFICE_APP_PREFIX + "-" + attr);
};

export const updateVirficeAttr = (element, attr, value) => {
  if (!element) return;
  element.setAttribute(VIRFICE_APP_PREFIX + "-" + attr, value);
};

export const isSettingsEnabled = (element) => {
  const settings_status = getVirficeAttr(element, "settings_status");
  if (settings_status === "disabled") {
    return false;
  }
  return true;
};
export const isBrandSettingsElementSelected = (element) => {
  if (!element) return null;
  const ele_type = getVirficeAttr(element, "ele_type");
  if (ele_type === "brand-settings") {
    return true;
  }
  return false;
};

export const getAllElementsUsingSelector = (parent, selector) => {
  return parent.querySelectorAll(
    `[${VIRFICE_APP_PREFIX}-selector="${selector}"]`
  );
};

export const getElementUsingMySelector = (parent, selector) => {
  return parent.querySelector(
    `[${VIRFICE_APP_PREFIX}-my_selector="${selector}"]`
  );
};
export const cloneElementFromString = (elementString) => {
  let div = document.createElement("div");
  div.innerHTML = elementString;
  return cloneElement(div.children[0]);
};

export const cloneElement = (element) => {
  let clone = element.cloneNode(true);

  updateVirficeAttr(clone, "id", generateRandomId());

  let allEle = clone.querySelectorAll(`[${VIRFICE_APP_PREFIX}-ele_type]`);
  allEle.forEach((ele) => {
    updateVirficeAttr(ele, "id", generateRandomId());
  });

  return clone;
};

export const getParentElement = (element) => {
  let parent = element;
  let flag = true;
  while (flag && parent) {
    parent = parent.parentNode;
    let parent_atr = getVirficeAttr(parent, "ele_type");

    if (!parent) return false;

    if (parent_atr) {
      return parent;
    }

    if (parent.id === VIRFICE_APP_PREFIX + "-email-preview") {
      return false;
    }
  }

  return false;
};

export const getChildElements = (element) => {
  if (!element) {
    console.error("Element is null or undefined.");
    return [];
  }

  const traverseChildren = (parent) => {
    const children = Array.from(parent.children);

    for (const child of children) {
      const childAttr = getVirficeAttr(child, "ele_type");
      if (childAttr) {
        // If `ele_type` is found, return siblings including this child
        return Array.from(child.parentNode.children);
      } else {
        // If not found, traverse deeper into this child's children
        const deeperResult = traverseChildren(child);
        if (deeperResult) {
          return deeperResult;
        }
      }
    }

    return []; // No matching child found
  };

  return traverseChildren(element);
};

export const getParentSection = (element) => {
  let parent = element;
  let flag = true;
  while (flag) {
    if (!parent) return false;
    if (getVirficeAttr(parent, "ele_type") === "section") {
      return parent;
    } else {
      parent = parent.parentNode;
    }
  }
  return false;
};

export const saveBuilderDataToRedux = (element) => {
  const wrapper = getIframe().document.getElementById(
    VIRFICE_APP_PREFIX + "-email-preview"
  );
  dispatchDashboardAction(setBuilderData, {
    key: "html",
    value: wrapper.innerHTML,
  });
};

export const scrollToCanvasElement = ({
  element,
  parent,
  behavior = "smooth",
  block = "center",
}) => {
  // console.log(element);
  // if (!element || !(element instanceof HTMLElement)) {
  //   console.error("Invalid element passed to scrollToCanvasElement");
  //   return;
  // }

  if (!element) {
    console.error("Invalid element passed to scrollToCanvasElement");
    return;
  }

  // Scroll only the specified parent container
  if (parent && parent instanceof HTMLElement) {
    const offsetTop = element.offsetTop - parent.offsetTop;
    const scrollOptions = { top: offsetTop, behavior };
    parent.scrollTo(scrollOptions);
  } else {
    // Fallback to scrollIntoView for direct element scrolling
    element.scrollIntoView({ behavior, block });
  }
};

export const getVirficeTemplateContent = () => {
  const templateWrapper = getIframe().templateWrapper;

  // Create a clone of the wrapper's content
  const templateContent = templateWrapper.cloneNode(true);

  // Remove the specific style node from the cloned content
  const clonedStyleElement = templateContent.querySelector(
    `#${VIRFICE_APP_PREFIX}-global-style`
  );
  if (clonedStyleElement) {
    clonedStyleElement.remove();
  }

  return templateContent.innerHTML;
};
