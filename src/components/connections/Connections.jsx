import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../utilis/constant";
import { setConnections } from "../../utilis/connectionsSlice";
import ProfileCard from "./ProfileCard";
// import { useNavigate } from "react-router-dom";

const Connections = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const connections = useSelector((store) => {
    const state = store.Connections;
    if (!state) return [];
    return Array.isArray(state) ? state : state.data || [];
  });

  const fetchConnections = async () => {
    if (connections.length > 0) return;
    try {
      const res = await axios.get(`${baseUrl}/user/connection`, {
        withCredentials: true,
      });
      dispatch(setConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err.message);
      // navigate("/error");
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // console.log(connections);

  if (!connections) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-base-content bg-base-100">
        Loading...
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-base-content bg-base-100">
        Loading
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-base-100 text-base-content">
      <h1 className="text-3xl font-bold mb-6 text-center">Connections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => (
          <ProfileCard key={connection._id} user={connection} isRequest={4} />
        ))}
      </div>
    </div>
  );
};

export default Connections;
