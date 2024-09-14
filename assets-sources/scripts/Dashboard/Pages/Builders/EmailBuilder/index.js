import React, { useEffect } from "react";
import StickyTopNav from "../../../Components/StickyTopNav";
import PageHeadingAndSubheading from "../../../Components/PageHeadingAndSubheading";
import Container from "../../../Molecules/Container";
import { VIRFICE_APP_PREFIX } from "../../../../conf";
import { pageInitData } from "./utils";
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
    //TODO: need to collect page data from server => pageInitData
    dispatch(setBuilderData({ key: "data", value: pageInitData }));
    dispatch(
      setBuilderData({ key: "selectedElementId", value: pageInitData?.root })
    );
  }, [pageInitData]);

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
