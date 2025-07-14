import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionsSlice";
import requestReducer from "./requestsSlice";

const appStore = configureStore({
  reducer: {
    User: userReducer,
    Feed: feedReducer,
    Connections: connectionReducer,
    Requests: requestReducer,
  },
});

export default appStore;
