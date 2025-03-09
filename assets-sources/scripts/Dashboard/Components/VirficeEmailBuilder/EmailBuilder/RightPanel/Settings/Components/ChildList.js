import React, { useEffect, useState } from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import SingleChild from "./SingleChild";
import { getChildElements } from "../../../utils";
import useChildChangeTracker from "../../../../../../../Hooks/useChildChangeTracker";

const ChildList = ({ element }) => {
  const [childrens, setChildrens] = useState(null);
  const childElements = useChildChangeTracker(element); // Track child changes

  useEffect(() => {
    if (element) setChildrens(getChildrens());
  }, [element, childElements]);
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
      <div className={`${VIRFICE_APP_PREFIX}-child-list`}>{childrens}</div>
    </>
  );
};

export default ChildList;
