import { createSlice } from "@reduxjs/toolkit";

const userRequestSlice = createSlice({
  name: "userRequest",
  initialState: [],
  reducers: {
    setUserRequest: (state, action) => {
      return action.payload;
    },
    addUserRequest: (state, action) => {
      state.push(action.payload);
    },
    removeUserRequest: (state, action) => {
      return state.filter((req) => req._id !== action.payload);
    },
    resetUserRequest: () => {
      return [];
    },
  },
});

export const {
  setUserRequest,
  addUserRequest,
  removeUserRequest,
  resetUserRequest,
} = userRequestSlice.actions;

export default userRequestSlice.reducer;
