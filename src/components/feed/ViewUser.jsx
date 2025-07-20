import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../utilis/constant";
import { removeFeed } from "../../utilis/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeRequests } from "../../utilis/requestsSlice";
import { removeUserRequest } from "../../utilis/userRequestSlice";

const ViewUser = () => {
  const { id, what, requestId } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((store) => store.User);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get(`${baseUrl}/profile/viewUser/${id}`, {
        withCredentials: true,
      });
      setUserData(res.data.data);
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError("User not found or server error.");
      navigate("/error");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleSendRequest = async (status, _id) => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await axios.post(
        `${baseUrl}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));

      if (status === "interested") {
        await axios.post(
          `${baseUrl}/notification/send`,
          {
            forUserId: _id,
            message: `${loggedInUser.firstName} has sent you a connection request`,
          },
          { withCredentials: true }
        );
      }

      setMessage("Connection request sent successfully.");
    } catch (err) {
      console.error("Error occurred:", err.response?.data || err.message);
      setError("Something went wrong while sending the request.");
      navigate("/error");
    } finally {
      setLoading(false);
    }
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
      setMessage(`Request ${status} successfully.`);
    } catch (err) {
      console.error(err.message);
      setError("Failed to review request.");
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
      setMessage("Request removed successfully.");
    } catch (err) {
      console.error(err.message);
      setError("Failed to remove request.");
      navigate("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Floating Alert */}
      {(message || error) && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div
            className={`alert ${
              message ? "alert-success" : "alert-error"
            } shadow-lg w-[90vw] sm:w-auto`}
          >
            <span>{message || error}</span>
          </div>
        </div>
      )}

      {userData ? (
        <div className="flex flex-col md:flex-row gap-8 items-start bg-base-200 p-6 rounded-xl shadow-lg">
          {/* Left Side: Photo and Buttons */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <img
              src={userData.photoUrl}
              alt="User"
              className="rounded-xl w-64 h-64 object-cover shadow-md"
            />
            {what === "1" && (
              <div className="flex gap-4 mt-4">
                <button
                  className="btn bg-red-500 text-white hover:bg-red-600"
                  onClick={() => handleSendRequest("ignored", id)}
                  disabled={loading}
                >
                  Ignore
                </button>
                <button
                  className="btn bg-green-500 text-white hover:bg-green-600"
                  onClick={() => handleSendRequest("interested", id)}
                  disabled={loading}
                >
                  Interested
                </button>
              </div>
            )}
            {what === "3" && (
              <div className="flex justify-center gap-4 px-6 pb-4 mt-4">
                <button
                  className="btn btn-success"
                  onClick={() => reviewRequest("accepted", id)}
                  disabled={loading}
                >
                  Accept
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => reviewRequest("rejected", id)}
                  disabled={loading}
                >
                  Reject
                </button>
              </div>
            )}
            {what === "4" && (
              <div className="flex justify-center gap-4 px-6 pb-4 mt-4">
                <button
                  className="btn btn-error"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to remove this request?"
                      )
                    ) {
                      unsendRequest(id);
                    }
                  }}
                  disabled={loading}
                >
                  Remove Request
                </button>
              </div>
            )}
          </div>

          {/* Right Side: User Details */}
          <div className="w-full md:w-2/3 space-y-4 text-base-content">
            <p>
              <span className="font-semibold">First Name:</span>{" "}
              {userData.firstName}
            </p>
            <p>
              <span className="font-semibold">Last Name:</span>{" "}
              {userData.lastName}
            </p>
            <p>
              <span className="font-semibold">Age:</span> {userData.age}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {userData.gender}
            </p>
            <p>
              <span className="font-semibold">Skills:</span>{" "}
              {userData.skills?.length > 0
                ? userData.skills.join(", ")
                : "None"}
            </p>
            <p>
              <span className="font-semibold">About:</span> {userData.about}
            </p>
          </div>
        </div>
      ) : (
        !error && (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )
      )}
    </div>
  );
};

export default ViewUser;
