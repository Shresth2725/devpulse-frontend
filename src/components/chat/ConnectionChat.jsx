import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../utilis/constant";
import { setConnections } from "../../utilis/connectionsSlice";
import { useNavigate, useParams } from "react-router-dom";

const ConnectionChat = ({ closeSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { targetUserId } = useParams();
  const [error, setError] = useState(null);

  const connections = useSelector((store) => {
    const state = store.Connections;
    return Array.isArray(state) ? state : state?.data || [];
  });

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user/connection`, {
        withCredentials: true,
      });
      dispatch(setConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err.message);
      setError("Failed to load connections.");
    }
  };

  useEffect(() => {
    if (connections.length === 0) {
      fetchConnections();
    }
  }, [connections, dispatch]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-xl text-error">
        {error}
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Chat</h1>
      <div className="space-y-2">
        {connections.map((user) => (
          <div
            key={user._id}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all
              hover:bg-base-200 ${
                targetUserId === user._id ? "bg-base-300 font-semibold" : ""
              }`}
            onClick={() => {
              navigate(`/chat/${user._id}/${user.firstName}`);
              closeSidebar?.();
            }}
          >
            <img
              src={user.photoUrl || "/default-avatar.png"}
              alt={user.firstName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="text-base">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-sm text-base-content/60">{user.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionChat;
