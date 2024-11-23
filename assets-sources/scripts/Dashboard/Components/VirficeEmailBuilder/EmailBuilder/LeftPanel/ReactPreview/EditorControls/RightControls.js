import React from "react";
import { VIRFICE_APP_PREFIX } from "../../../../../../../conf";
import {
  DeleteIcon,
  DownIcon,
  DuplicateIcon,
  UpIcon,
} from "../../../../../../icons";
import { duplicateElement } from "./utils";
import {
  getParentElement,
  getVirficeAttr,
  // initEmptyElement,
  saveBuilderDataToRedux,
} from "../../../utils";
import { dispatchDashboardAction } from "@functions";
import { onSelectElement, setBuilderData } from "../../../../builderSlice";
import { useDispatch } from "react-redux";
import { showNotificationBell } from "../../../../../componentsSlice";

const Divider = () => {
  return (
    <div style={{ marginTop: 4, marginBottom: 4, lineHeight: 0 }}>
      <svg
        width="18"
        height="2"
        viewBox="0 0 18 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1L17 1" stroke="#C9C9C9" strokeLinecap="round" />
      </svg>
    </div>
  );
};
const RightControl = ({ element }) => {
  const dispatch = useDispatch();

  const handleDuplicate = () => {
    duplicateElement(element);
    saveBuilderDataToRedux();
  };
  const handleDelete = () => {
    if (element.id === VIRFICE_APP_PREFIX + "-root") {
      return;
    }
    const parentEle = getParentElement(element);

    element.remove();
    dispatchDashboardAction(onSelectElement, getVirficeAttr(parentEle, "id"));
    // initEmptyElement(parentEle);
  };

  // Move element up by adjusting its position in the DOM
  const handleMoveUp = () => {
    const parent = element.parentNode;

    if (element.previousElementSibling) {
      // Insert element before the previous sibling
      parent.insertBefore(element, element.previousElementSibling);
      // saveBuilderDataToRedux();
    } else {
      dispatch(
        showNotificationBell({
          title: "You can't move up",
          type: "danger",
        })
      );
    }
  };

  // Move element down by adjusting its position in the DOM
  const handleMoveDown = () => {
    const parent = element.parentNode;
    if (element.nextElementSibling) {
      // Insert element after the next sibling
      parent.insertBefore(element.nextElementSibling, element);
      // saveBuilderDataToRedux();
    } else {
      dispatch(
        showNotificationBell({
          title: "You can't move down",
          type: "danger",
        })
      );
    }
  };
  return (
    <div className={VIRFICE_APP_PREFIX + "-right-control"}>
      <div className={`${VIRFICE_APP_PREFIX}-item`} onClick={handleMoveUp}>
        <UpIcon />
      </div>
      <div className={`${VIRFICE_APP_PREFIX}-item`} onClick={handleMoveDown}>
        <DownIcon />
      </div>

      <Divider />
      <div className={`${VIRFICE_APP_PREFIX}-item`} onClick={handleDuplicate}>
        <DuplicateIcon />
      </div>

      <div className={`${VIRFICE_APP_PREFIX}-item`} onClick={handleDelete}>
        <DeleteIcon />
      </div>
    </div>
  );
};

export default RightControl;
