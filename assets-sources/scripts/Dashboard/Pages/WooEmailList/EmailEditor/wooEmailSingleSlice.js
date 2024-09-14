import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { VIRFICE_APP_PREFIX } from "../../../../conf";
import { showNotificationBell } from "../../../Components/componentsSlice";

const initialState = {
  email: { loaded: false, settings: {} },
  changedSettings: {},
  selectedOrder: {},
};

export const wooEmailSingleSlice = createSlice({
  name: VIRFICE_APP_PREFIX,
  initialState,
  reducers: {
    setWooEmailSingleData: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setWooEmailSingleSettingsData: (state, action) => {
      const { settings } = action.payload;
      state.email.settings.settings = settings;
    },
  },
});

export const emailSingleAsync = (email_id) => (dispatch) => {
  let d = null;
  let apiSlug = "virfice/v1/woo-email/single";

  axios
    .get(`${virfice.restBase}${apiSlug}`, {
      headers: {
        "X-WP-Nonce": virfice.nonce,
      },
      params: { email_id },
    })
    .then((res) => {
      d = res.data;
      dispatch(
        setWooEmailSingleData({
          key: "email",
          value: {
            loaded: true,
            settings: { ...d.object, previewUrl: d.previewUrl },
          },
        })
      );

      dispatch(
        setWooEmailSingleData({
          key: "changedSettings",
          value: d.object.settings,
        })
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

export const saveWooEmailSettings = (email_id, settings) => (dispatch) => {
  let d = null;
  let apiSlug = "virfice/v1/woo-email/save-email-settings";
  const formData = new FormData();
  formData.append("settings", JSON.stringify(settings));
  formData.append("email_id", email_id);

  axios
    .post(`${virfice.restBase}${apiSlug}`, formData, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        "X-WP-Nonce": virfice.nonce,
      },
    })
    .then((res) => {
      d = res.data;
      dispatch(setWooEmailSingleSettingsData({ settings: settings }));
      dispatch(showNotificationBell({ title: "Settings saved" }));
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        showNotificationBell({ title: "Settings saved failed", type: "danger" })
      );
    });
};

// Action creators are generated for each case reducer function
export const { setWooEmailSingleData, setWooEmailSingleSettingsData } =
  wooEmailSingleSlice.actions;

export default wooEmailSingleSlice.reducer;
