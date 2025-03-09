import React, { useEffect, useRef, useState } from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import SingleChild from "./SingleChild";
import { getChildElements } from "../../../utils";
import useChildChangeTracker from "../../../../../../../Hooks/useChildChangeTracker";
import { setBuilderData } from "../../../../builderSlice";
import { useDispatch } from "react-redux";

const ChildList = ({ element }) => {
  const dispatch = useDispatch();
  const [childrens, setChildrens] = useState([]);
  const toggler = useChildChangeTracker(element); // Track child changes

  useEffect(() => {
    // if (element) setChildrens(element);
    if (element) {
      setChildrens(getChildElements(element));
    }
  }, [element]);

  useEffect(() => {
    dispatch(
      setBuilderData({
        key: "forceUpdateToogler",
        value: Math.random(),
      })
    );
  }, [toggler]);
  return (
    <div className={`${VIRFICE_APP_PREFIX}-child-list`}>
      {childrens.map((child, i) => (
        <SingleChild element={child} key={i} />
      ))}
    </div>
  );
};

export default ChildList;
