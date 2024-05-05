import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { VIRFICE_APP_PREFIX } from "../../../conf";

const initialState = {
  emailList: { loaded: false, data: [] }
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

// Action creators are generated for each case reducer function
export const { setWooEmailListData } = wooEmailListSlice.actions;

export default wooEmailListSlice.reducer;
