import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../utilis/constant";
import { VerifiedIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Comments = ({
  data,
  allComments = [],
  postId,
  onCommentAdded,
  isRootComment = false,
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");

  const replies = allComments?.filter(
    (comment) => comment.parentCommentId === data?._id
  );

  const handleReplySubmit = async () => {
    try {
      await axios.post(
        baseUrl + "/post/comment",
        {
          postId,
          text: replyText,
          parentCommentId: isRootComment ? null : data._id,
        },
        { withCredentials: true }
      );
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      console.error(err.message);
    } finally {
      setReplyText("");
      setShowReplyBox(false);
    }
  };

  if (isRootComment) {
    return (
      <div className="p-2 mb-2 bg-base-200 rounded-lg">
        <input
          type="text"
          placeholder="Write a comment..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="input input-sm input-bordered w-full max-w-xs"
        />
        <button
          onClick={handleReplySubmit}
          className="btn btn-sm btn-primary ml-2"
        >
          Send
        </button>
      </div>
    );
  }

  const { userId, text, createdAt } = data;
  // console.log(userId);

  const isPosterPremium = userId.isPremium;

  return (
    <div className="p-2 mb-2 bg-base-200 rounded-lg">
      <div className="flex items-start gap-3">
        <div className="avatar">
          <div className="w-8 h-8 rounded-full">
            <img src={userId.photoUrl} alt="user" />
          </div>
        </div>
        <div className="flex-1">
          <Link to={`/viewUser/${userId._id}/${2}/${0}`}>
            <p className="font-semibold text-base-content">
              {userId.firstName} {userId.lastName}
              {isPosterPremium && (
                <VerifiedIcon className="inline-block w-5 h-5 text-blue-500 ml-1" />
              )}
            </p>
          </Link>
          <p className="text-base-content/80">{text}</p>
          <p className="text-xs text-base-content/50">
            {new Date(createdAt).toLocaleString()}
          </p>

          <div className="mt-1 flex gap-4 text-sm text-primary">
            <button onClick={() => setShowReplyBox(!showReplyBox)}>
              Reply
            </button>
            {replies.length > 0 && (
              <button onClick={() => setShowReplies(!showReplies)}>
                {showReplies
                  ? "Hide Replies"
                  : `View Replies (${replies.length})`}
              </button>
            )}
          </div>

          {showReplyBox && (
            <div className="mt-2">
              <input
                type="text"
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="input input-sm input-bordered w-full max-w-xs"
              />
              <button
                onClick={handleReplySubmit}
                className="btn btn-sm btn-primary ml-2"
              >
                Send
              </button>
            </div>
          )}

          {showReplies && (
            <div className="mt-2 pl-6 border-l border-primary-300 space-y-2">
              {replies.map((reply) => (
                <Comments
                  key={reply._id}
                  data={reply}
                  allComments={allComments}
                  postId={postId}
                  onCommentAdded={onCommentAdded}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
