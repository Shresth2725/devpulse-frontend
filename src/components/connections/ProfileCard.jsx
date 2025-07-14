import axios from "axios";
import React from "react";
import { baseUrl } from "../../utilis/constant";
import { useDispatch } from "react-redux";
import { removeRequests } from "../../utilis/requestsSlice";

const ProfileCard = ({ user, isRequest, onAlert }) => {
  const { photoUrl, firstName, lastName, about, age, gender, _id } = user;
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      console.log("Button clicked:", status, _id);

      const res = await axios.post(
        baseUrl + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log("API success:", res.data);

      dispatch(removeRequests(_id));

      if (onAlert) {
        onAlert(
          status === "accepted"
            ? "Request accepted successfully!"
            : "Request rejected successfully!"
        );
      }
    } catch (err) {
      console.error("Error reviewing request:", err.message);
    }
  };

  return (
    <div className="bg-[#1F2937] text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
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

      {isRequest && (
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
    </div>
  );
};

export default ProfileCard;
