import { configureStore } from '@reduxjs/toolkit'
import landingReducer from '../Pages/Landing/landingSlice'
import brandSettingsSlice from '../Pages/BrandSettings/brandSettingsSlice'
import wooEmailListSlice from '../Pages/WooEmailList/wooEmailListSlice'
import wooEmailSingleSlice from '../Pages/WooEmailList/EmailEditor/wooEmailSingleSlice'
import globalSettingsSlice from '../Pages/Settings/globalSettingsSlice'
import componentsSlice from '../Components/componentsSlice'


export const store = configureStore({
  reducer: {
    landing: landingReducer,
    brandSettings: brandSettingsSlice,
    wooEmailList: wooEmailListSlice,
    wooEmailSingle: wooEmailSingleSlice,
    components: componentsSlice,
    globalSettings: globalSettingsSlice,
  },
})

