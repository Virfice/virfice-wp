import { createSlice } from "@reduxjs/toolkit";
import { VIRFICE_APP_PREFIX, VIRFICE_ASSETS_BASE } from "@conf";
import axios from "axios";

const initialState = {
  loaded: false,
  data: [],
};

export const readyBlockSlice = createSlice({
  name: VIRFICE_APP_PREFIX,
  initialState,
  reducers: {
    setReadyBlockStateData: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const readyBlocksAsync = () => (dispatch) => {
  let d = null;
  let apiUrl = VIRFICE_ASSETS_BASE + "/templates/ready-blocks";
  axios
    .get(`${apiUrl}`, {
      // headers: {
      //   "X-WP-Nonce": virfice.nonce,
      // },
    })
    .then((res) => {
      d = res.data;
      dispatch(
        setReadyBlockStateData({
          key: "loaded",
          value: true,
        })
      );
      dispatch(
        setReadyBlockStateData({
          key: "data",
          value: d,
        })
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

// Action creators are generated for each case reducer function
export const { setReadyBlockStateData } = readyBlockSlice.actions;

export default readyBlockSlice.reducer;
