import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionsSlice";
import requestReducer from "./requestsSlice";
import userRequestReducer from "./userRequestSlice";
import notificationReducer from "./notificationSlice";
import notificationHistoryReducer from "./notificationHistorySlice";
import settingReducer from "./settingSlice";

const appStore = configureStore({
  reducer: {
    User: userReducer,
    Feed: feedReducer,
    Connections: connectionReducer,
    Requests: requestReducer,
    UserRequest: userRequestReducer,
    Notifications: notificationReducer,
    NotificationHistory: notificationHistoryReducer,
    Setting: settingReducer,
  },
});

export default appStore;
