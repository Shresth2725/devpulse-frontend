import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../../utilis/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utilis/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((store) => store.Feed);

  const getFeed = async () => {
    try {
      if (userFeed) return;
      const res = await axios.get(baseUrl + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    userFeed && (
      <div className="flex justify-center my-10">
        <FeedCard user={userFeed[0]} />
      </div>
    )
  );
};

export default Feed;
