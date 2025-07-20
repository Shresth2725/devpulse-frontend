import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../utilis/constant";
import { setRequests } from "../../utilis/requestsSlice";
import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store?.Requests);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      if (requests?.length > 0) return;

      try {
        const response = await axios.get(`${baseUrl}/user/request/received`, {
          withCredentials: true,
        });
        dispatch(setRequests(response.data.data));
      } catch (error) {
        console.error("Failed to fetch requests:", error.message);
        navigate("/error");
      }
    };

    fetchRequests();
  }, []);

  if (!requests) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-base-content bg-base-100">
        Loading...
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-base-content bg-base-100">
        No Request Found
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-base-100 text-base-content">
      <h1 className="text-3xl font-bold mb-6 text-center">Requests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((connection) => (
          <ProfileCard
            key={connection._id}
            user={connection?.fromUserId}
            isRequest={1}
          />
        ))}
      </div>
    </div>
  );
};

export default Requests;
