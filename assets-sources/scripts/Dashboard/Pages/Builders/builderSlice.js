import { createSlice } from "@reduxjs/toolkit";
import { VIRFICE_APP_PREFIX } from "../../../conf";

const initialState = {
  html: ``,
  selectedElementId: false,
  selectedSectionId: false,
};

export const builderSlice = createSlice({
  name: VIRFICE_APP_PREFIX,
  initialState,
  reducers: {
    setBuilderData: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const onSelectElement = (elementId) => (dispatch) => {
  dispatch(
    setBuilderData({
      key: "selectedElementId",
      value: elementId,
    })
  );
};

export const onSelectSection = (elementId) => (dispatch) => {
  dispatch(
    setBuilderData({
      key: "selectedSectionId",
      value: elementId,
    })
  );
};

// Action creators are generated for each case reducer function
export const { setBuilderData } = builderSlice.actions;

export default builderSlice.reducer;
