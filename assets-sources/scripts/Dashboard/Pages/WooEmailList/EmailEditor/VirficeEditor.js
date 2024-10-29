import React, { useEffect } from "react";
import VirficeEmailBuilder from "../../../Components/VirficeEmailBuilder";
import { addParams, getParamValue } from "../../../../functions";
import StickyTopNav from "../../../Components/StickyTopNav";
import PageHeadingAndSubheading from "../../../Components/PageHeadingAndSubheading";
import { useDispatch, useSelector } from "react-redux";
import {
  emailSingleAsync,
  emailSingleVirficeAsync,
} from "./wooEmailSingleSlice";
import { saveSingleTemplate } from "../../../Components/VirficeEmailBuilder/builderSlice";

const VirficeEditor = () => {
  const email_id = getParamValue("email_id");
  const dispatch = useDispatch();
  const emailSettings = useSelector(
    (state) => state.wooEmailSingle?.email?.settings
  );
  const virfice_template = useSelector(
    (state) => state.wooEmailSingle?.virfice_template
  );

  useEffect(() => {
    dispatch(emailSingleAsync(email_id));
    dispatch(emailSingleVirficeAsync(email_id));
  }, []);

  const handleBackActionClick = () => {
    window.location.href = addParams({ menu: "woo-email-list" });
  };

  const handleDiscardClick = () => {
    console.log("discard button click");
  };
  const handleSaveClick = () => {
    console.log("save button click");
    if (virfice_template.id) {
      let templateWrapper = document.querySelector("#virfice-email-preview");

      dispatch(
        saveSingleTemplate(virfice_template.id, {
          post_content: templateWrapper.innerHTML,
        })
      );
    }
  };

  return (
    <>
      <StickyTopNav
        backAction={handleBackActionClick}
        discardAction={handleDiscardClick}
        saveAction={handleSaveClick}
      />
      <section>
        <PageHeadingAndSubheading
          heading={emailSettings?.title}
          subHeading={emailSettings?.description}
        />
        {virfice_template.id && (
          <VirficeEmailBuilder template_id={virfice_template.id} />
        )}
        {!virfice_template.id && "Template not found"}
      </section>
    </>
  );
};

export default VirficeEditor;
