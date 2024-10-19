import React from "react";
import VirficeEmailBuilder from "../../../Components/VirficeEmailBuilder";
import { addParams, getParamValue } from "../../../../functions";
import StickyTopNav from "../../../Components/StickyTopNav";
import PageHeadingAndSubheading from "../../../Components/PageHeadingAndSubheading";
import { showNotificationBell } from "../../../Components/componentsSlice";

const VirficeEditor = () => {
  const email_id = getParamValue("email_id");
  console.log(email_id);
  //TODO: need to get html

  const handleBackActionClick = () => {
    window.location.href = addParams({ menu: "woo-email-list" });
  };

  const handleDiscardClick = () => {
    console.log("discard button click");
  };
  const handleSaveClick = () => {
    console.log("save button click");
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
          heading={"New Order"}
          subHeading={"This is subheading"}
        />
        <VirficeEmailBuilder template_id={0} />
      </section>
    </>
  );
};

export default VirficeEditor;
