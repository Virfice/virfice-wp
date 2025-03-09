import React from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import {
  getVirficeAttr,
  initEmailBuilder,
  saveBuilderDataToRedux,
  selectElementUsingID,
} from "../../../utils";
import {
  ChevronRightIcon,
  DeleteIcon,
  DuplicateIcon,
  GrabIcon,
} from "@svg-icons";
import { dispatchDashboardAction } from "@functions";
import { onSelectElement } from "../../../../builderSlice";
import Button from "@molecules/Button";
import { duplicateElement } from "../../../LeftPanel/ReactPreview/EditorControls/utils";

const SingleChild = ({ element }) => {
  const handleSelectItem = () => {
    dispatchDashboardAction(onSelectElement, getVirficeAttr(element, "id"));
  };
  return (
    <div className={`${VIRFICE_APP_PREFIX}-item`} onClick={handleSelectItem}>
      <div
        className={`${VIRFICE_APP_PREFIX}-flex-align-center ${VIRFICE_APP_PREFIX}-gap-8`}
      >
        <GrabIcon />
        <div>{getVirficeAttr(element, "title")}</div>
      </div>
      <div className={`${VIRFICE_APP_PREFIX}-item-action-wrapper`}>
        <div className={`${VIRFICE_APP_PREFIX}-item-action`}>
          <Button
            type="tertiary"
            icon={<DuplicateIcon />}
            small
            onClick={() => {
              const vID = duplicateElement(element);
              setTimeout(() => {
                saveBuilderDataToRedux();
                selectElementUsingID(vID);
                initEmailBuilder();
              }, 200);
            }}
          />
        </div>
        <div className={`${VIRFICE_APP_PREFIX}-item-action`}>
          <Button
            type="tertiary"
            icon={<DeleteIcon />}
            small
            onClick={() => {
              element.remove();
            }}
          />
        </div>

        <ChevronRightIcon />
      </div>
    </div>
  );
};

export default SingleChild;
