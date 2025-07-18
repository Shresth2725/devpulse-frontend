import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../utilis/constant";
import { useDispatch, useSelector } from "react-redux";
import { removeRequests } from "../../utilis/requestsSlice";
import { removeUserRequest } from "../../utilis/userRequestSlice";

const ProfileCard = ({ user, isRequest, requestId }) => {
  const {
    photoUrl,
    firstName,
    lastName,
    about,
    age,
    gender,
    _id: userId,
  } = user;
  const dispatch = useDispatch();
  const loggedInUser = useSelector((store) => store.User);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const triggerAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const reviewRequest = async (status, userId) => {
    try {
      setLoading(true);

      await axios.post(
        `${baseUrl}/request/review/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      await axios.post(
        `${baseUrl}/notification/send`,
        {
          forUserId: userId,
          message: `${loggedInUser.firstName} has ${status} your connection request`,
        },
        { withCredentials: true }
      );

      dispatch(removeRequests(userId));
      triggerAlert(
        status === "accepted"
          ? "Request accepted successfully!"
          : "Request rejected successfully!"
      );
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const unsendRequest = async (userId) => {
    try {
      setLoading(true);
      await axios.post(
        `${baseUrl}/request/unsend/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserRequest(requestId));
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-base-200 text-base-content rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      {/* SUCCESS ALERT */}
      {showAlert && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-success text-success-content px-4 py-2 rounded-lg shadow-md flex items-center z-10">
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
          src={photoUrl || "/default-user.png"}
          alt={`${firstName} ${lastName}`}
          className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow-md"
        />
        <h2 className="mt-4 text-xl font-semibold text-center">
          {firstName} {lastName}
        </h2>
        <p className="text-base-content text-sm mt-1 text-center px-2">
          {about || "No description available."}
        </p>
        <div className="mt-3 text-sm text-center">
          <p>
            Age: <span className="font-medium">{age || "N/A"}</span>
          </p>
          <p>
            Gender:{" "}
            <span className="font-medium capitalize">{gender || "N/A"}</span>
          </p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      {isRequest === 1 && (
        <div className="flex justify-center gap-4 px-6 pb-4">
          <button
            className="btn btn-success"
            onClick={() => reviewRequest("accepted", userId)}
            disabled={loading}
          >
            Accept
          </button>
          <button
            className="btn btn-error"
            onClick={() => reviewRequest("rejected", userId)}
            disabled={loading}
          >
            Reject
          </button>
        </div>
      )}
      {isRequest === 2 && (
        <div className="flex justify-center gap-4 px-6 pb-4">
          <button
            className="btn btn-error"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to remove this request?")
              ) {
                unsendRequest(userId);
              }
            }}
            disabled={loading}
          >
            Remove Request
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
