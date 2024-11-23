import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { VIRFICE_APP_PREFIX } from "@conf";
import { showNotificationBell } from "@components/componentsSlice";

const initialState = {
  emailList: { loaded: false, data: [] },
  settings: { loaded: false, data: {} },
  changedSettings: {},
  selectedOrder: {},
};

export const brandSettingsSlice = createSlice({
  name: VIRFICE_APP_PREFIX,
  initialState,
  reducers: {
    setBrandSettingsData: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const brandSettingsAsync = () => (dispatch) => {
  let d = null;
  let apiSlug = "virfice/v1/woo-email/brand-settings";

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
        setBrandSettingsData({
          key: "settings",
          value: { loaded: true, data: d },
        })
      );
      dispatch(
        setBrandSettingsData({
          key: "changedSettings",
          value: d,
        })
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

export const saveBrandSettings = (data) => (dispatch) => {
  let d = null;
  let apiSlug = "virfice/v1/woo-email/brand-settings";
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
        setBrandSettingsData({
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

export const emailListAsync = () => (dispatch) => {
  let d = null;
  let apiSlug = "virfice/v1/woo-email/all";

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
        setBrandSettingsData({
          key: "emailList",
          value: { loaded: true, data: d },
        })
      );
      if (d.length > 0) {
        let singleEmail = d[0];
        dispatch(
          setBrandSettingsData({
            key: "currentEmail",
            value: {
              value: singleEmail.id,
              title: singleEmail.title,
              ...singleEmail,
            },
          })
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// Action creators are generated for each case reducer function
export const { setBrandSettingsData } = brandSettingsSlice.actions;

export default brandSettingsSlice.reducer;
