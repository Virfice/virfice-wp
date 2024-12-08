import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { VIRFICE_APP_PREFIX } from "@conf";
import { showNotificationBell } from "@components/componentsSlice";

const initialState = {
  settings: { loaded: false, data: {} },
  changedSettings: {},
};

export const virficeBrandSettingsSlice = createSlice({
  name: VIRFICE_APP_PREFIX,
  initialState,
  reducers: {
    setVirficeBrandSettingsData: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const virficeBrandSettingsAsync = () => (dispatch) => {
  let d = null;
  let apiSlug = "virfice/v1/woo-email/virfice-brand-settings";

  axios
    .get(`${virfice.restBase}${apiSlug}`, {
      headers: {
        "X-WP-Nonce": virfice.nonce,
      },
      params: {},
    })
    .then((res) => {
      d = res.data;
      dispatch(
        setVirficeBrandSettingsData({
          key: "settings",
          value: { loaded: true, data: d },
        })
      );
      dispatch(
        setVirficeBrandSettingsData({
          key: "changedSettings",
          value: d,
        })
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

export const saveVirficeBrandSettings = (data) => (dispatch) => {
  let d = null;
  let apiSlug = "virfice/v1/woo-email/virfice-brand-settings";
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));

  axios
    .post(`${virfice.restBase}${apiSlug}`, formData, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        "X-WP-Nonce": virfice.nonce,
      },
    })
    .then((res) => {
      d = res.data;
      dispatch(
        setVirficeBrandSettingsData({
          key: "settings",
          value: { loaded: true, data: data },
        })
      );
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
export const { setVirficeBrandSettingsData } =
  virficeBrandSettingsSlice.actions;

export default virficeBrandSettingsSlice.reducer;
