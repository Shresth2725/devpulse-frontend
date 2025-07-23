import React, { useEffect } from "react";
import { baseUrl } from "../../utilis/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notification = ({ notification, isHistory }) => {
  const { message = "No message", createdAt, fromUserId, _id } = notification;
  const navigate = useNavigate();

  const seenMessage = async () => {
    try {
      await axios.patch(
        baseUrl + "/notification/seen",
        { id: _id },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err.message);
      // navigate("/error");
    }
  };

  useEffect(() => {
    if (!isHistory) seenMessage();
  }, []);

  if (!notification) return null;

  const formattedTime = new Date(createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="p-4 border rounded-lg shadow-md bg-[#1F2937] max-w-md text-gray-100">
      <h2 className="text-xl font-semibold mb-2">Notification</h2>
      <p>
        <strong>From:</strong>{" "}
        {fromUserId
          ? `${fromUserId.firstName} ${fromUserId.lastName}`
          : "Unknown"}
      </p>
      <p>
        <strong>Message:</strong> {message}
      </p>
      <p className="text-gray-400 text-sm mt-2">
        <strong>Time:</strong> {formattedTime}
      </p>
    </div>
  );
};

export default Notification;
