import React from "react";
import Button from "@molecules/Button";
import { VIRFICE_APP_PREFIX } from "../../../conf";
import Container from "@molecules/Container";
import CalloutCard from "../../Components/CalloutCard";
import FeatureBanner from "./FeatureBanner";
import { addParams, createAssetUrl } from "../../../functions";
import { useDispatch } from "react-redux";
import { incrementAsync } from "./landingSlice";
import brandCustomizeSRC from "./BrandCustomize.png";
import testMailSRC from "./Testmail.png";
import VirficeCommonHeader from "../../Components/VirficeCommonHeader";

const Landing = () => {
  const dispatch = useDispatch();

  dispatch(incrementAsync(200));

  return (
    <>
      <VirficeCommonHeader />
      <section>
        <Container>
          <div
            className={`${VIRFICE_APP_PREFIX}-flex-col ${VIRFICE_APP_PREFIX}-gap-16`}
          >
            <FeatureBanner />
            <CalloutCard
              heading={"Customize WooCommerce email templates"}
              subHeading={
                "Set up essential email parameters, store address, and the store’s social links."
              }
              ActionButton={
                <Button
                  type="secondary"
                  title="Configure now!"
                  link={addParams({ menu: "settings" })}
                />
              }
              Illustration={<img src={createAssetUrl(brandCustomizeSRC)} />}
            />

            <CalloutCard
              heading={"Customize and manage all WooCommerce emails"}
              subHeading={
                "Customize, manage, preview, and test each WooCommerce email individually."
              }
              ActionButton={
                <Button
                  type="secondary"
                  title="Customize and test!"
                  link={addParams({ menu: "woo-email-list" })}
                />
              }
              Illustration={<img src={createAssetUrl(testMailSRC)} />}
            />
          </div>
        </Container>
      </section>
    </>
  );
};

export default Landing;
