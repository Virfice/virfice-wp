import React from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import { getVirficeAttr } from "../../../utils";
import { ChevronRightIcon, EyeIcon, GrabIcon } from "@svg-icons";
import { dispatchDashboardAction } from "@functions";
import { onSelectElement } from "../../../../builderSlice";

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
          <EyeIcon />
        </div>

        <div className={`${VIRFICE_APP_PREFIX}-item-action`}>
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  );
};

export default SingleChild;
