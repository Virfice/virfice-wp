import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { VIRFICE_APP_PREFIX } from "../../../conf";
import { showNotificationBell } from "../../Components/componentsSlice";

const initialState = {
  email: { loaded: false, data: {} },
  brand: { loaded: false, data: {} },
  // smtp: { loaded: false, data: {} },
};

export const globalSettingsSlice = createSlice({
  name: VIRFICE_APP_PREFIX,
  initialState,
  reducers: {
    setGlobalSettingsData: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const globalSettingsAsync = (keys) => (dispatch) => {
  let d = null;
  let apiSlug = "virfice/v1/settings/get-settings";

  axios
    .get(`${virfice.restBase}${apiSlug}`, {
      headers: {
        "X-WP-Nonce": virfice.nonce,
      },
      params: { keys: JSON.stringify(keys) },
    })
    .then((res) => {
      d = res.data;
      Object.keys(d).forEach((key) => {
        dispatch(
          setGlobalSettingsData({
            key: key,
            value: { loaded: true, data: d[key] },
          })
        );
        dispatch(
          setGlobalSettingsData({
            key: "changedSettings-" + key,
            value: d[key],
          })
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const saveGlobalSettings = (key) => (dispatch, getState) => {
  let settings = getState().globalSettings["changedSettings-" + key];
  let d = null;
  let apiSlug = "virfice/v1/settings/save-settings";

  const formData = new FormData();
  formData.append("key", key);
  formData.append("settings", JSON.stringify(settings));

  axios
    .post(`${virfice.restBase}${apiSlug}`, formData, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        "X-WP-Nonce": virfice.nonce,
      },
    })
    .then((res) => {
      d = res.data;
      dispatch(showNotificationBell({ title: "Settings saved" }));
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        showNotificationBell({ title: "Settings saved failed", type: "danger" })
      );
    });
};

export const discardGlobalSettings = (key) => (dispatch, getState) => {
  let settings = getState().globalSettings[key]?.data || {};
  dispatch(
    setGlobalSettingsData({ key: "changedSettings-" + key, value: settings })
  );
  dispatch(
    showNotificationBell({ title: "Settings discarded", type: "danger" })
  );
};

// Action creators are generated for each case reducer function
export const { setGlobalSettingsData } = globalSettingsSlice.actions;

export default globalSettingsSlice.reducer;
