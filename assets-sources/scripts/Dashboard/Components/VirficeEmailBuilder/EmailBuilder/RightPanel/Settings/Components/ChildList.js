import React from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import SingleChild from "./SingleChild";
import { getChildElements } from "../../../utils";

const ChildList = ({ element }) => {
  const getChildrens = () => {
    let childs = [];
    const childList = getChildElements(element);
    for (var i = 0; i < childList.length; i++) {
      let child = childList[i];
      childs.push(<SingleChild element={child} key={i} />);
    }

    return childs;
  };
  return (
    <>
      <div className={`${VIRFICE_APP_PREFIX}-child-list`}>{getChildrens()}</div>
    </>
  );
};

export default ChildList;
