import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    setRequests: (state, action) => {
      return action.payload;
    },
    addRequests: (state, action) => {
      state.push(action.payload);
    },
    removeRequests: (state, action) => {
      const idToRemove = action.payload;
      return state.filter((conn) => conn?.fromUserId?._id !== idToRemove);
    },
    resetRequests: () => {
      return [];
    },
  },
});

export const { setRequests, addRequests, removeRequests, resetRequests } =
  requestSlice.actions;

export default requestSlice.reducer;
