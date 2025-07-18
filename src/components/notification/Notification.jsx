import React from "react";
import NotificationCard from "./NotificationCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { History } from "lucide-react";

const Notification = () => {
  const notifications = useSelector((store) => store.Notifications);

  return (
    <div className="relative p-4 m-5">
      {/* History icon in top-right */}
      <Link
        to="/notificationHistory"
        className="absolute top-4 right-4 text-white/80 hover:text-white"
        title="Notification History"
      >
        <History className="w-6 h-6" />
      </Link>

      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notifications?.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              isHistory={0}
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
