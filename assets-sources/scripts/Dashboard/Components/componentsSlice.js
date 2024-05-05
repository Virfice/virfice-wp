import { createSlice } from "@reduxjs/toolkit";
import { VIRFICE_APP_PREFIX } from "../../conf";

const initialState = {
  notificationBell: {
    open: false, 
  }
};

export const componentsSlice = createSlice({
  name: VIRFICE_APP_PREFIX,
  initialState,
  reducers: {
    setComponentsStateData: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

/**
 * 
 * type: success | danger
 */
export const showNotificationBell = ({title, type='success', duration=3000}) => (dispatch) => {
  dispatch(setComponentsStateData({
    key: "notificationBell",
    value: { open: true, title, type, duration },
  }))

  if(duration){
    setTimeout(() => {
      dispatch(closeNotificationBell());
    }, duration); 
  }
};

export const closeNotificationBell = () => (dispatch) => {
  dispatch(setComponentsStateData({
    key: "notificationBell",
    value: { open: false},
  }))
};

// Action creators are generated for each case reducer function
export const { setComponentsStateData } = componentsSlice.actions;

export default componentsSlice.reducer;
