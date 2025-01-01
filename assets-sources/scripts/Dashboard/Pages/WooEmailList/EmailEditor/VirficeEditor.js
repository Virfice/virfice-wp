import React, { useEffect } from "react";
import VirficeEmailBuilder from "@components/VirficeEmailBuilder";
import {
  addParams,
  getParamValue,
  saveEmailOuterAndInnerBGColor,
} from "@functions";
import StickyTopNav from "@components/StickyTopNav";
import { useDispatch, useSelector } from "react-redux";
import { VIRFICE_APP_PREFIX } from "@conf";
import {
  emailSingleAsync,
  emailSingleVirficeAsync,
} from "./wooEmailSingleSlice";
import { saveSingleTemplate } from "@components/VirficeEmailBuilder/builderSlice";

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

    //TODO: need to get all shortCode list from backend.
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
      const templateWrapper = document.querySelector("#virfice-email-preview");

      // Create a clone of the wrapper's content
      const templateContent = templateWrapper.cloneNode(true);

      // Remove the specific style node from the cloned content
      const clonedStyleElement = templateContent.querySelector(
        `#${VIRFICE_APP_PREFIX}-global-style`
      );
      if (clonedStyleElement) {
        clonedStyleElement.remove();
      }

      dispatch(
        saveSingleTemplate(virfice_template.id, {
          post_content: templateContent.innerHTML,
        })
      );

      saveEmailOuterAndInnerBGColor();
    }
  };

  return (
    <>
      <StickyTopNav
        backAction={handleBackActionClick}
        discardAction={handleDiscardClick}
        saveAction={handleSaveClick}
        size1280
        marginBottom={false}
      />
      <section style={{ position: "relative", top: 64 }}>
        {/* <PageHeadingAndSubheading
          heading={emailSettings?.title}
          subHeading={emailSettings?.description}
          size1280
        /> */}
        {virfice_template.id && (
          <VirficeEmailBuilder template_id={virfice_template.id} />
        )}
        {!virfice_template.id && "Template not found"}
      </section>
    </>
  );
};

export default VirficeEditor;
