import React from "react";
import Button from "../../Molecules/Button";
import { VIRFICE_APP_PREFIX } from "../../../conf";
import Container from "../../Molecules/Container";
import CalloutCard from "../../Components/CalloutCard";
import FeatureBanner from "./FeatureBanner";
import { addParams, createAssetUrl } from "../../../functions";
import {useDispatch} from 'react-redux';
import {  incrementAsync } from "./landingSlice";
import brandCustomizeSRC from "./BrandCustomize.png";
import testMailSRC from "./Testmail.png";
import VirficeCommonHeader from "../../Components/VirficeCommonHeader";

const Landing = () => {
  const dispatch = useDispatch();

  const handleCustomizeClick = () => {
    window.location.href = addParams({ menu:  "brand-settings" });
  };
  const handleCustomizeAndPreviewClick = () => {
    window.location.href = addParams({ menu:  "woo-email-list" });
  };

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
              heading={"Your business your brand, customize now!"}
              subHeading={
                "Upload your store’s logo, change colors and fonts, and more."
              }
              ActionButton={
                <Button
                  type="secondary"
                  title="Customize now"
                  onClick={handleCustomizeClick}
                />
              }
              Illustration={<img src={createAssetUrl(brandCustomizeSRC)} />}
              />

            <CalloutCard
              heading={"Preview and send test emails"}
              subHeading={
                "Check WooCommerce email previews and send test emails"
              }
              ActionButton={
                <Button type="secondary" title="Customize & preview" onClick={handleCustomizeAndPreviewClick}/>
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
