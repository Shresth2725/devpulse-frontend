import React, { useState, useEffect } from "react";
import Likes from "./Likes";
import Comments from "./Comments";
import axios from "axios";
import { baseUrl } from "../../utilis/constant";
import { useSelector } from "react-redux";
import { ThumbsUp, MessageSquare, Eye, VerifiedIcon } from "lucide-react";
import { Link } from "react-router-dom";

const PostCard = ({ data, fetchPost }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isLikeOpen, setIsLikeOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const loggedInUser = useSelector((store) => store.User);
  const isPosterPremium = data.fromUserId.isPremium;

  const { fromUserId, message, imageUrl, createdAt, likes, comments } = data;

  // console.log(likes);
  // console.log(loggedInUser);

  useEffect(() => {
    if (!loggedInUser || (!loggedInUser._id && !loggedInUser.data?._id)) return;

    const userId = loggedInUser._id || loggedInUser.data._id;

    const alreadyLiked = likes.some((like) => like.likerId._id === userId);
    setIsLiked(alreadyLiked);
  }, [likes, loggedInUser]);

  const toggleComments = () => setIsCommentsOpen(!isCommentsOpen);
  const toggleLikeList = () => setIsLikeOpen(!isLikeOpen);

  const toggleLike = async () => {
    try {
      await axios.post(
        baseUrl + "/post/like",
        { postId: data._id },
        { withCredentials: true }
      );
      fetchPost();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="card bg-base-200 shadow-md mb-6 mx-auto w-full max-w-xl">
      <div className="card-body p-4">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={fromUserId.photoUrl} alt="user" />
            </div>
          </div>
          <div>
            <Link to={`/viewUser/${fromUserId._id}/${2}/${0}`}>
              <h1 className="font-semibold text-base-content">
                {fromUserId.firstName} {fromUserId.lastName}
                {isPosterPremium && (
                  <VerifiedIcon className="inline-block w-5 h-5 text-blue-500 ml-1" />
                )}
              </h1>
            </Link>
            <p className="text-xs text-base-content/60">
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Message */}
        <p className="text-base-content mb-2">{message}</p>

        {/* Image */}
        {imageUrl && (
          <div className="rounded-lg overflow-hidden mb-3">
            <img
              src={imageUrl}
              alt="Post"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <button
            onClick={toggleLike}
            className={`btn btn-sm ${
              isLiked ? "btn-primary" : "btn-outline"
            } flex items-center gap-1`}
          >
            <ThumbsUp size={16} />
            {isLiked ? "Liked" : "Like"}
          </button>

          <button
            onClick={toggleLikeList}
            className="btn btn-sm btn-ghost text-base-content/70 hover:text-primary flex items-center gap-1"
          >
            <Eye size={16} />
            <span>
              {likes.length} {likes.length === 1 ? "Like" : "Likes"}
            </span>
          </button>

          <button
            onClick={toggleComments}
            className="btn btn-sm btn-ghost text-base-content/70 hover:text-primary flex items-center gap-1"
          >
            <MessageSquare size={16} />
            <span>{comments.length} Comments</span>
          </button>
        </div>

        {/* Likes List */}
        {isLikeOpen && (
          <div className="mt-2 p-2 rounded-lg bg-base-100 shadow-sm space-y-1">
            <p className="font-semibold text-sm text-base-content mb-1">
              Liked by:
            </p>
            {likes.length === 0 ? (
              <p className="text-xs text-base-content/50">No likes yet</p>
            ) : (
              likes.map((like) => <Likes key={like._id} data={like} />)
            )}
          </div>
        )}

        {/* Comments */}
        {isCommentsOpen && (
          <div className="mt-2 space-y-1">
            <Comments
              isRootComment={true}
              postId={data._id}
              onCommentAdded={fetchPost}
            />
            {comments
              .filter((comment) => comment.parentCommentId === null)
              .map((comment) => (
                <Comments
                  key={comment._id}
                  data={comment}
                  allComments={comments}
                  postId={data._id}
                  onCommentAdded={fetchPost}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
