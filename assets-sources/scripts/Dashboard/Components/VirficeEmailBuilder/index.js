import React, { useEffect } from "react";
import EmailBuilder from "./EmailBuilder";
import { useDispatch } from "react-redux";
import { getSingleTemplate } from "./builderSlice";
import { virficeBrandSettingsAsync } from "../../Pages/VirficeBrandSettings/virficeBrandSettingsSlice";

const VirficeEmailBuilder = ({ template_id }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (template_id) {
      // console.log("get template html");
      dispatch(getSingleTemplate(template_id));
      dispatch(virficeBrandSettingsAsync());
    }
  }, [template_id]);

  return <EmailBuilder />;
};

export default VirficeEmailBuilder;
