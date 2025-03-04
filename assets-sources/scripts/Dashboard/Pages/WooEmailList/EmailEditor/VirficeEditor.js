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
import {
  getIframe,
  getVirficeTemplateContent,
  initEmailBuilder,
} from "../../../Components/VirficeEmailBuilder/EmailBuilder/utils";
import { showNotificationBell } from "../../../Components/componentsSlice";

const VirficeEditor = () => {
  const email_id = getParamValue("email_id");
  const dispatch = useDispatch();
  const virfice_template = useSelector(
    (state) => state.wooEmailSingle?.virfice_template
  );

  const builderPost = useSelector((state) => state.builder.post);

  useEffect(() => {
    dispatch(emailSingleAsync(email_id));
    dispatch(emailSingleVirficeAsync(email_id));
    //TODO: need to get all shortCode list from backend.
  }, []);

  const handleBackActionClick = () => {
    window.location.href = addParams({ menu: "woo-email-list" });
  };

  const handleDiscardClick = () => {
    const templateWrapper = getIframe().templateWrapper;
    templateWrapper.innerHTML = builderPost.post_content;

    initEmailBuilder();

    dispatch(
      showNotificationBell({ title: "Template discarded", type: "success" })
    );
  };

  const handleSaveClick = () => {
    if (virfice_template.id) {
      dispatch(
        saveSingleTemplate(virfice_template.id, {
          post_content: getVirficeTemplateContent(),
        })
      );
      saveEmailOuterAndInnerBGColor().then(() => {});
    }
  };

  const handleSaveAndNextClick = () => {
    if (virfice_template.id) {
      dispatch(
        saveSingleTemplate(virfice_template.id, {
          post_content: getVirficeTemplateContent(),
        })
      );
      saveEmailOuterAndInnerBGColor().then(() => {
        window.location.href = addParams({
          menu: "woo-email-edit-preview-virfice",
          email_id: email_id,
        });
      });
    }
  };

  return (
    <>
      <StickyTopNav
        backAction={handleBackActionClick}
        discardAction={handleDiscardClick}
        saveAction={handleSaveClick}
        saveButtonText="Save"
        saveAndNextAction={handleSaveAndNextClick}
        saveAndNextButtonText="Save & Next"
        size1280
        marginBottom={false}
      />
      <section className={`${VIRFICE_APP_PREFIX}-builder-section-main`}>
        {/* <PageHeadingAndSubheading
          heading={emailSettings?.title}
          subHeading={emailSettings?.description}
          size1280
        /> */}
        {virfice_template.id && (
          <VirficeEmailBuilder template_id={virfice_template.id} />
        )}
        {!virfice_template.id && "Loading..."}
      </section>
    </>
  );
};

export default VirficeEditor;
