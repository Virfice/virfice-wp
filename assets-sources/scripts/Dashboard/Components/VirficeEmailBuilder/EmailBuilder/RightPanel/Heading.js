import React, { Fragment } from "react";
import { BackIcon } from "@svg-icons";
import { isSettingsEnabled, getParentElement, getVirficeAttr } from "../utils";
import { VIRFICE_APP_PREFIX } from "@conf";
import { dispatchDashboardAction } from "@functions";
import { onSelectElement } from "../../builderSlice";

const Heading = ({ element }) => {
  const title = getVirficeAttr(element, "title");
  const subTitle = getVirficeAttr(element, "sub_title");

  const handleBackClick = () => {
    let parent = getParentElement(element);
    if (parent) {
      dispatchDashboardAction(onSelectElement, getVirficeAttr(parent, "id"));
    }
  };

  // const hasBack = getVirficeAttr(element, "ele_type") !== "section";
  const parentEle = getParentElement(element);
  const hasBack = parentEle && isSettingsEnabled(parentEle);

  return (
    <Fragment>
      <div>
        <div
          className={`${VIRFICE_APP_PREFIX}-flex-align-center ${VIRFICE_APP_PREFIX}-gap-2`}
        >
          {hasBack && (
            <div
              className={`${VIRFICE_APP_PREFIX}-flex`}
              onClick={handleBackClick}
              style={{ cursor: "pointer" }}
            >
              <BackIcon />
            </div>
          )}
          <div className={`title__medium`}>{title}</div>
        </div>
        {subTitle && (
          <div className="body__medium" style={{ maxWidth: 521 }}>
            {subTitle}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Heading;
