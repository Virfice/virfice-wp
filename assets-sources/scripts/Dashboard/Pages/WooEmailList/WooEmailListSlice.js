import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { VIRFICE_APP_PREFIX } from "../../../conf";
import { showNotificationBell } from "../../Components/componentsSlice";

const initialState = {
  emailList: { loaded: false, data: [] },
};

export const wooEmailListSlice = createSlice({
  name: VIRFICE_APP_PREFIX,
  initialState,
  reducers: {
    setWooEmailListData: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

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
        setWooEmailListData({
          key: "emailList",
          value: { loaded: true, data: d },
        })
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateVirficeTemplateStatus =
  (email_id, status) => (dispatch, getState) => {
    let d = null;
    let apiSlug = "virfice/v1/woo-email/update-virfice-template-status";

    const formData = new FormData();
    formData.append("email_id", email_id);
    formData.append("status", status);

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
          showNotificationBell({
            title:
              "Virfice template " +
              (status ? "enabled" : "disabled") +
              " for " +
              email_id,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          showNotificationBell({
            title: "Settings saved failed",
            type: "danger",
          })
        );
      });
  };

// Action creators are generated for each case reducer function
export const { setWooEmailListData } = wooEmailListSlice.actions;

export default wooEmailListSlice.reducer;
