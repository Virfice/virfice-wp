import React from "react";
import { VIRFICE_APP_PREFIX } from "../../../../../../../conf";
import SingleChild from "./SingleChild";

const ChildList = ({ element }) => {
  console.log(element);
  const getChildrens = () => {
    let childs = [];
    for (var i = 0; i < element.children.length; i++) {
      let child = element.children[i];
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
