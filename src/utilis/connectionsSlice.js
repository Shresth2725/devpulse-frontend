import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    setConnections: (state, action) => {
      return action.payload;
    },

    addConnection: (state, action) => {
      state.push(action.payload);
    },

    removeConnection: (state, action) => {
      const idToRemove = action.payload;
      return state.filter((conn) => conn?._id !== idToRemove);
    },
    resetConnections: () => {
      return [];
    },
  },
});

export const {
  setConnections,
  addConnection,
  removeConnection,
  resetConnections,
} = connectionSlice.actions;
export default connectionSlice.reducer;
