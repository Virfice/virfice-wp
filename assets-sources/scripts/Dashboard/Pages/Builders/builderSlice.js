import { createSlice } from "@reduxjs/toolkit";
import { VIRFICE_APP_PREFIX } from "../../../conf";

const initialState = { data: {}, selectedElementId: false };

export const builderSlice = createSlice({
  name: VIRFICE_APP_PREFIX,
  initialState,
  reducers: {
    setBuilderData: (state, action) => {
      const { key, value } = action.payload;
      console.log({ key, value });
      state[key] = value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBuilderData } = builderSlice.actions;

export default builderSlice.reducer;
