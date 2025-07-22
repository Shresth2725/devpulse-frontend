import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../../utilis/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utilis/feedSlice";
import FeedCard from "./FeedCard";
// import { useNavigate } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((store) => store.Feed);
  // const navigate = useNavigate();

  const getFeed = async () => {
    if (userFeed) return;
    try {
      const res = await axios.get(baseUrl + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error(err);
      // navigate("/error");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!userFeed) {
    return (
      <div className="font-bold text-center text-xl mt-10">Loading...</div>
    );
  }

  if (userFeed.length === 0) {
    return (
      <div className="font-bold text-center text-xl mt-10">No User Left</div>
    );
  }

  return (
    userFeed && (
      <div className="flex justify-center my-10">
        <FeedCard user={userFeed[0]} />
      </div>
    )
  );
};

export default Feed;
