import axios from "axios";
import React from "react";
import { baseUrl } from "../../utilis/constant";
import { useDispatch, useSelector } from "react-redux";
import { removeFeed } from "../../utilis/feedSlice";
import { Link, useNavigate } from "react-router-dom";
import { Verified, VerifiedIcon } from "lucide-react";

const FeedCard = ({ user }) => {
  const { photoUrl, firstName, lastName, about, _id, isPremium } = user;
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const loggedInUser = useSelector((store) => store.User);

  const handleSendRequest = async (status, _id) => {
    try {
      await axios.post(
        baseUrl + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));

      if (status === "interested") {
        await axios.post(
          baseUrl + "/notification/send",
          {
            forUserId: _id,
            message: `${loggedInUser.firstName} has sent you a connection request`,
          },
          { withCredentials: true }
        );
      }
    } catch (err) {
      console.error("Error occurred:", err.response?.data || err.message);
      // navigate("/error");
    }
  };

  return (
    <div className="h-full">
      <div className="card bg-base-300 h-full shadow-xl">
        <figure className="p-6">
          <Link to={`/viewUser/${_id}/1/0`}>
            <img
              src={
                photoUrl ||
                "https://sclpa.com/wp-content/uploads/2022/10/dummy-img-1.jpg"
              }
              alt={firstName + " Picture"}
              className="rounded-xl object-cover max-h-60"
            />
          </Link>
        </figure>
        <div className="card-body items-center text-center">
          <Link to={`/viewUser/${_id}/1/0`}>
            <h2 className="card-title text-xl font-semibold">
              {firstName} {lastName}{" "}
              {isPremium && (
                <VerifiedIcon className="inline-block w-5 h-5 text-blue-500 ml-1" />
              )}
            </h2>
          </Link>
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
