import axios from "axios";
import React from "react";
import { baseUrl } from "../../utilis/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../../utilis/feedSlice";

const FeedCard = ({ user }) => {
  const { photoUrl, firstName, lastName, about, _id } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        baseUrl + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeFeed(_id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="h-full ">
      <div className="card bg-base-300 h-full shadow-xl">
        <figure className="p-6">
          <img
            src={photoUrl}
            alt={firstName + " Picture"}
            className="rounded-xl object-cover max-h-60"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-xl font-semibold">
            {firstName} {lastName}
          </h2>
          <p className="text-sm">{about}</p>
          <div className="card-actions justify-center mt-4">
            <button
              className="btn bg-red-500 text-white"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn bg-green-500 text-white"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
