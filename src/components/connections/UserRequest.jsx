import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../../utilis/constant";
import { useDispatch, useSelector } from "react-redux";
import { setUserRequest } from "../../utilis/userRequestSlice";
import ProfileCard from "./ProfileCard";
// import { useNavigate } from "react-router-dom";

const UserRequest = () => {
  const dispatch = useDispatch();
  const userRequests = useSelector((store) => store.UserRequest);
  // const navigate = useNavigate();

  const fetchUserRequest = async () => {
    try {
      const res = await axios.get(baseUrl + "/user/request/sent", {
        withCredentials: true,
      });
      dispatch(setUserRequest(res.data.data));
    } catch (err) {
      console.error("Error fetching user requests:", err.message);
      // navigate("/error");
    }
  };

  useEffect(() => {
    fetchUserRequest();
  }, []);

  if (!userRequests) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-base-content bg-base-100">
        Loading...
      </div>
    );
  }

  if (userRequests.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-base-content bg-base-100">
        No Sent Requests Found
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-base-100 text-base-content">
      <h1 className="text-3xl font-bold mb-6 text-center">Sent Requests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userRequests.map((connection) => (
          <ProfileCard
            key={connection._id}
            user={connection?.toUserId}
            isRequest={2}
            requestId={connection._id}
          />
        ))}
      </div>
    </div>
  );
};

export default UserRequest;
