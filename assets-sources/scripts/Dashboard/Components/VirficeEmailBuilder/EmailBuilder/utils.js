import { VIRFICE_APP_PREFIX } from "@conf";
import { dispatchDashboardAction, generateRandomId } from "@functions";
import {
  onHoverSection,
  onSelectElement,
  onSelectSection,
  setBuilderData,
} from "../builderSlice";

export const initEmailBuilder = () => {
  const wrapper = document.getElementById(
    VIRFICE_APP_PREFIX + "-email-preview"
  );
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

  const editorWrapper = document.getElementById("virfice-editor-wrapper");
  editorWrapper.addEventListener("click", () => {
    dispatchDashboardAction(onSelectElement, null);
  });
};

const initClickEvent = (ele) => {
  ele.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log(e.target.tagName);
    let validEle = e.target;
    let vID = getVirficeAttr(validEle, "id");
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
  ele.addEventListener("mouseleave", (e) => {
    e.stopPropagation();
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
  const wrapper = document.getElementById(
    VIRFICE_APP_PREFIX + "-email-preview"
  );
  return wrapper.querySelector(`[${VIRFICE_APP_PREFIX}-id="${elementId}"]`);
};

export const getVirficeAttr = (element, attr) => {
  if (!element) return;
  return element.getAttribute(VIRFICE_APP_PREFIX + "-" + attr);
};

export const updateVirficeAttr = (element, attr, value) => {
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
  const wrapper = document.getElementById(
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
  if (!element || !(element instanceof HTMLElement)) {
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
