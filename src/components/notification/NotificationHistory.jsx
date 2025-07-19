import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../../utilis/constant";
import { useDispatch, useSelector } from "react-redux";
import NotificationCard from "./NotificationCard";
import { setNotificationHistory } from "../../utilis/notificationHistorySlice";
import { useNavigate } from "react-router-dom";

const NotificationHistory = () => {
  const historyNotification = useSelector((store) => store.NotificationHistory);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchHistoryNotification = async () => {
    if (historyNotification.length > 0) return;
    try {
      const res = await axios.get(baseUrl + "/notification/receive/all", {
        withCredentials: true,
      });
      dispatch(setNotificationHistory(res.data.data));
    } catch (err) {
      console.error(err.message);
      navigate("error");
    }
  };

  useEffect(() => {
    fetchHistoryNotification();
  }, []);

  if (!historyNotification)
    return <div className="text-lg text-center">Loading...</div>;

  return (
    <div className="p-6 md:p-10 bg-base-200 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold ">Notification History</h1>
      </div>

      {historyNotification.length === 0 ? (
        <p className="text-gray-500 text-lg">No notifications in history.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {historyNotification.map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              isHistory={1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationHistory;
