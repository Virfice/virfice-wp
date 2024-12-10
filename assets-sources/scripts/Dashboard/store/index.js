import { configureStore } from "@reduxjs/toolkit";
import landingReducer from "../Pages/Landing/landingSlice";
// import brandSettingsSlice from "../Pages/BrandSettings/brandSettingsSlice";
import virficeBrandSettingsSlice from "../Pages/VirficeBrandSettings/virficeBrandSettingsSlice";
import wooEmailListSlice from "../Pages/WooEmailList/wooEmailListSlice";
import wooEmailSingleSlice from "../Pages/WooEmailList/EmailEditor/wooEmailSingleSlice";
import globalSettingsSlice from "../Pages/Settings/globalSettingsSlice";
import componentsSlice from "@components/componentsSlice";
import builderSlice from "@components/VirficeEmailBuilder/builderSlice";

export const store = configureStore({
  reducer: {
    landing: landingReducer,
    // brandSettings: brandSettingsSlice,
    virficeBrandSettings: virficeBrandSettingsSlice,
    wooEmailList: wooEmailListSlice,
    wooEmailSingle: wooEmailSingleSlice,
    components: componentsSlice,
    globalSettings: globalSettingsSlice,
    builder: builderSlice,
  },
});
