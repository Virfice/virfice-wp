import React from "react";
import StickyTopNav from "@components/StickyTopNav";
import { VIRFICE_APP_PREFIX } from "@conf";
import VirficeEmailBuilder from "../../Components/VirficeEmailBuilder";
import { getParamValue } from "@functions";
import { saveSingleTemplate } from "../../Components/VirficeEmailBuilder/builderSlice";
import { useDispatch } from "react-redux";
import { getVirficeTemplateContent } from "../../Components/VirficeEmailBuilder/EmailBuilder/utils";
import { showNotificationBell } from "../../Components/componentsSlice";

const VirficeTemplateEditor = () => {
  const template_id = getParamValue("template_id");
  const dispatch = useDispatch();

  const handleBackActionClick = () => {
    const siteUrl = window.location.origin; // Gets the base URL (e.g., https://wordpress.test)
    const dynamicUrl = `${siteUrl}/wp-admin/edit.php?post_type=virfice_template`;
    // Redirect to the URL
    window.location.href = dynamicUrl;
  };

  const handleDiscardClick = () => {};
  const handleSaveClick = () => {
    console.log("save button click");
    dispatch(
      saveSingleTemplate(template_id, {
        post_content: getVirficeTemplateContent(),
      })
    );
    dispatch(
      showNotificationBell({ title: "Template saved", type: "success" })
    );
  };

  return (
    <>
      <StickyTopNav
        backAction={handleBackActionClick}
        discardAction={handleDiscardClick}
        saveAction={handleSaveClick}
        saveButtonText="Save"
        size1280
        marginBottom={false}
      />
      <section className={`${VIRFICE_APP_PREFIX}-builder-section-main`}>
        {template_id && <VirficeEmailBuilder template_id={template_id} />}
        {!template_id && "Loading..."}
      </section>
    </>
  );
};

export default VirficeTemplateEditor;
