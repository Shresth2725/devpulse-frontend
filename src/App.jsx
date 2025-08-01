import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utilis/appStore";
import Body from "./components/common/Body";
import Login from "./components/auth/Login";
import Profile from "./components/profile/Profile";
import Feed from "./components/feed/Feed";
import Connections from "./components/connections/Connections";
import Requests from "./components/connections/Requests";
import UserRequest from "./components/connections/UserRequest";
import Notification from "./components/notification/Notification";
import Setting from "./components/setting/Setting";
import Modes from "./components/setting/Modes";
import ResetPassword from "./components/setting/ResetPassword";
import DeleteAccount from "./components/setting/DeleteAccount";
import About from "./components/setting/About";
import NotificationHistory from "./components/notification/NotificationHistory";
import ViewUser from "./components/feed/ViewUser";
import Error from "./components/common/Error";
import Chat from "./components/chat/Chat";
import ConnectionsChat from "./components/chat/ConnectionChat";
import ChatLayout from "./components/chat/ChatLayout";
import Premium from "./components/premium/Premium";
import Post from "./components/post/Post";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="userRequests" element={<UserRequest />} />
            <Route path="notification" element={<Notification />} />
            <Route path="error" element={<Error />} />
            <Route path="premium" element={<Premium />} />
            <Route path="post" element={<Post />} />
            <Route
              path="notificationHistory"
              element={<NotificationHistory />}
            />
            <Route
              path="viewUser/:id/:what/:requestId"
              element={<ViewUser />}
            />

            {/* Chat */}
            <Route path="chat" element={<ChatLayout />}>
              <Route
                index
                element={
                  <div className="flex justify-center items-center h-full w-full">
                    Select a user to chat
                  </div>
                }
              />
              <Route path=":targetUserId/:targetFirstName" element={<Chat />} />
            </Route>

            {/* Settings with nested routes */}
            <Route path="settings" element={<Setting />}>
              <Route path="" element={<Modes />} />
              <Route path="modes" element={<Modes />} />
              <Route path="resetPassword" element={<ResetPassword />} />
              <Route path="deleteAccount" element={<DeleteAccount />} />
              <Route path="about" element={<About />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
