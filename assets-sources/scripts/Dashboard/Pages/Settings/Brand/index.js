import React, { useEffect } from "react";
import { VIRFICE_APP_PREFIX } from "../../../../conf";
import { useDispatch, useSelector } from "react-redux";
import { globalSettingsAsync } from "../globalSettingsSlice";
import Loading from "../../../Molecules/Loading";
import SocialLinks from "./SocialLinks";
import BrandSettings from "./BrandSettings";
// import CronJob from "./CronJob";

const Brand = () => {
  const dispatch = useDispatch();
  const settingsLoaded = useSelector(
    (state) => state.globalSettings.brand.loaded
  );
  useEffect(() => {
    dispatch(globalSettingsAsync(["brand"]));
  }, []);

  return (
    <div
      className={`${VIRFICE_APP_PREFIX}-flex-col ${VIRFICE_APP_PREFIX}-gap-20`}
    >
      {!settingsLoaded && <Loading />}
      {settingsLoaded && (
        <>
          <BrandSettings />
          <SocialLinks />
        </>
      )}
    </div>
  );
};

export default Brand;
