import { VIRFICE_APP_PREFIX } from "@conf";
import { dispatchDashboardAction, generateRandomId } from "@functions";
import {
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
  allEle.forEach((ele) => {
    initClickEvent(ele);
    initHoverEvent(ele);
    // initEmptyElement(ele);//not used
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
    if (!vID) {
      validEle = getParentElement(ele);
    }

    if (!isSettingsEnabled(validEle)) {
      //thats mean single basic element selected. like: image, text, button
      validEle = validEle.querySelector(`[${VIRFICE_APP_PREFIX}-ele_type]`);
    }

    dispatchDashboardAction(onSelectElement, getVirficeAttr(validEle, "id"));

    let sectionEle = ele;

    if (getVirficeAttr(sectionEle, "ele_type") !== "section") {
      sectionEle = getParentSection(sectionEle);
    }
    dispatchDashboardAction(onSelectSection, getVirficeAttr(sectionEle, "id"));
  });
};

const initHoverEvent = (ele) => {
  ele.addEventListener("mouseover", (e) => {
    e.stopPropagation();
    ele.classList.add(`${VIRFICE_APP_PREFIX}-hover-border`);
  });
  ele.addEventListener("mouseleave", (e) => {
    e.stopPropagation();
    ele.classList.remove(`${VIRFICE_APP_PREFIX}-hover-border`);
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
  clone.classList.remove(`${VIRFICE_APP_PREFIX}-hover-border`);

  let allEle = clone.querySelectorAll(`[${VIRFICE_APP_PREFIX}-ele_type]`);
  allEle.forEach((ele) => {
    updateVirficeAttr(ele, "id", generateRandomId());
    ele.classList.remove(`${VIRFICE_APP_PREFIX}-hover-border`);
  });

  return clone;
};

export const getParentElement = (element) => {
  let parent = element;
  let flag = true;
  while (flag) {
    parent = parent.parentNode;
    let parent_atr = getVirficeAttr(parent, "ele_type");
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
