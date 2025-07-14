import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../utilis/constant";
import { useDispatch } from "react-redux";
import { removeRequests } from "../../utilis/requestsSlice";
import { removeUserRequest } from "../../utilis/userRequestSlice";

const ProfileCard = ({ user, isRequest, requestId }) => {
  const { photoUrl, firstName, lastName, about, age, gender, _id } = user;
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        baseUrl + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
      setAlertMessage(
        status === "accepted"
          ? "Request accepted successfully!"
          : "Request rejected successfully!"
      );
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error(err.message);
    }
  };

  const unsendRequest = async (_id) => {
    try {
      await axios.post(
        baseUrl + "/request/unsend/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserRequest(requestId));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="relative bg-[#1F2937] text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      {/* SUCCESS ALERT */}
      {showAlert && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center z-10">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>{alertMessage}</span>
        </div>
      )}

      {/* CARD BODY */}
      <div className="flex flex-col items-center p-6">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow-md"
        />
        <h2 className="mt-4 text-xl font-semibold text-center">
          {firstName} {lastName}
        </h2>
        <p className="text-gray-300 text-sm mt-1 text-center px-2">
          {about || "No description available."}
        </p>
        <div className="mt-3 text-gray-400 text-sm text-center">
          <p>
            Age: <span className="font-medium text-white">{age || "N/A"}</span>
          </p>
          <p>
            Gender:{" "}
            <span className="font-medium text-white capitalize">
              {gender || "N/A"}
            </span>
          </p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      {isRequest === 1 && (
        <div className="flex justify-center gap-4 px-6 pb-4">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={() => reviewRequest("accepted", _id)}
          >
            Accept
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={() => reviewRequest("rejected", _id)}
          >
            Reject
          </button>
        </div>
      )}
      {isRequest === 2 && (
        <div className="flex justify-center gap-4 px-6 pb-4">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={() => unsendRequest(_id)}
          >
            Remove Request
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
