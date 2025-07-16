import React from "react";
import NotificationCard from "./NotificationCard";
import { useSelector } from "react-redux";

const Notification = () => {
  const notifications = useSelector((store) => store.Notifications);

  return (
    <div className="p-4 m-5">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notifications?.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
            />
          ))
        ) : (
          <p className="text-gray-500">No notifications yet.</p>
        )}
      </div>
    </div>
  );
};

export default Notification;
