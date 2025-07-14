import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../../utilis/constant";
import { useDispatch, useSelector } from "react-redux";
import { setRequests } from "../../utilis/requestsSlice";
import ProfileCard from "./ProfileCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store?.Requests);

  const fetchRequests = async () => {
    if (requests.length > 0) return;
    try {
      const res = await axios.get(baseUrl + "/user/request/received", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(setRequests(res.data.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        No Request Found
      </div>
    );
  }

  return (
    <div className="p-6 text-white min-h-screen bg-[#12171C]">
      <h1 className="text-3xl font-bold mb-6 text-center">Requests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((connection) => (
          <ProfileCard
            key={connection._id}
            user={connection?.fromUserId}
            isRequest={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Requests;
