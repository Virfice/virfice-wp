import { createSlice } from "@reduxjs/toolkit";
import { VIRFICE_APP_PREFIX } from "@conf";

const initialState = {
  value: 0,
};

export const landingSlice = createSlice({
  name: VIRFICE_APP_PREFIX,
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = landingSlice.actions;

export default landingSlice.reducer;
