import React, { useEffect } from "react";
import EmailBuilder from "./EmailBuilder";
import { useDispatch } from "react-redux";
import { cloneElementFromString } from "./EmailBuilder/utils";
import Basics from "./EmailBuilder/Assets/Sections/Basics";
import { commonCSS } from "./EmailBuilder/Assets/utils";
import { setBuilderData } from "./builderSlice";

const blankPageData = `
<style>
    ${commonCSS}
</style>
${cloneElementFromString(Basics[0].template).outerHTML}
`;

const VirficeEmailBuilder = ({ template_id }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (template_id) {
      console.log("get template html");
    }
  }, [template_id]);

  useEffect(() => {
    //TODO: need to collect page data from server => initData
    dispatch(setBuilderData({ key: "html", value: blankPageData }));
    // dispatch(
    //   setBuilderData({ key: "selectedElementId", value: initData?.root })
    // );
  }, [blankPageData]);

  return <EmailBuilder />;
};

export default VirficeEmailBuilder;
