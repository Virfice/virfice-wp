import React, { useEffect } from "react";
import StickyTopNav from "../../../Components/StickyTopNav";
import PageHeadingAndSubheading from "../../../Components/PageHeadingAndSubheading";
import Container from "../../../Molecules/Container";
import Card from "../../../Molecules/Card";
import { VIRFICE_APP_PREFIX } from "../../../../conf";
import { pageInitData } from "./utils";
import Settings from "./Settings";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useDispatch } from "react-redux";
import { setBuilderData } from "../builderSlice";

const EmailBuilder = () => {
  const dispatch = useDispatch();
  const handleBackActionClick = () => {
    window.location.href = addParams({ menu: "" });
  };

  useEffect(() => {
    // console.log(pageInitData);
    dispatch(setBuilderData(pageInitData));
  }, []);

  return (
    <>
      <StickyTopNav backAction={handleBackActionClick} />
      <section>
        <PageHeadingAndSubheading
          heading={"Email builder"}
          subHeading={
            "Customize the look and feel of all WooCommerce emails. Let your emails represent your store."
          }
        />

        <Container>
          <div
            className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-20`}
          >
            <LeftPanel />
            <RightPanel />
          </div>
        </Container>
      </section>
    </>
  );
};

export default EmailBuilder;
