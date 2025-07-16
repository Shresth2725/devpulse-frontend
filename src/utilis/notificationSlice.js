import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
    addNotification: (state, action) => {
      state.push(action.payload);
    },
    resetNotification: () => {
      return [];
    },
  },
});

export const { setNotification, addNotification, resetNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
