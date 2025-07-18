import { createSlice } from "@reduxjs/toolkit";

const notificationHistorySlice = createSlice({
  name: "NotificationHistorySlice",
  initialState: [],
  reducers: {
    setNotificationHistory: (state, action) => {
      return action.payload;
    },
    addNotificationHistory: (state, action) => {
      state.push(action.payload);
    },
    resetNotificationHistory: () => {
      return [];
    },
  },
});

export const {
  setNotificationHistory,
  addNotificationHistory,
  resetNotificationHistory,
} = notificationHistorySlice.actions;

export default notificationHistorySlice.reducer;
