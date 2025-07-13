import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionsSlice";

const appStore = configureStore({
  reducer: {
    User: userReducer,
    Feed: feedReducer,
    Connections: connectionReducer,
  },
});

export default appStore;
