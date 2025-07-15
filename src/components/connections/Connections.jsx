import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../utilis/constant";
import { setConnections } from "../../utilis/connectionsSlice";
import ProfileCard from "./ProfileCard";

const Connections = () => {
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
      // console.log(res.data.data);

      dispatch(setConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        No Connections Found
      </div>
    );
  }
  return (
    <div className="p-6 text-white min-h-screen bg-[#12171C]">
      <h1 className="text-3xl font-bold mb-6 text-center">Connections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => (
          <ProfileCard key={connection._id} user={connection} />
        ))}
      </div>
    </div>
  );
};

export default Connections;
