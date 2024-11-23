import React, { useEffect } from "react";
import Basic from "./Basic";
import { VIRFICE_APP_PREFIX } from "@conf";
import { useDispatch, useSelector } from "react-redux";
import { globalSettingsAsync } from "../globalSettingsSlice";
import Loading from "@molecules/Loading";
import StoreDetails from "./StoreDetails";
// import CronJob from "./CronJob";

const Email = () => {
  const dispatch = useDispatch();
  const settingsLoaded = useSelector(
    (state) => state.globalSettings.email.loaded
  );
  useEffect(() => {
    dispatch(globalSettingsAsync(["email"]));
  }, []);

  return (
    <div
      className={`${VIRFICE_APP_PREFIX}-flex-col ${VIRFICE_APP_PREFIX}-gap-20`}
    >
      {!settingsLoaded && <Loading />}
      {settingsLoaded && (
        <>
          <Basic />
          <StoreDetails />
          {/* <CronJob /> */}
        </>
      )}
    </div>
  );
};

export default Email;
