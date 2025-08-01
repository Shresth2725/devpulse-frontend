import { VerifiedIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Likes = ({ data }) => {
  const { likerId, createdAt } = data;
  const isPosterPremium = likerId.isPremium;

  return (
    <div className="flex items-center gap-2 text-sm text-base-content px-2 py-1">
      <div className="avatar">
        <div className="w-6 h-6 rounded-full">
          <img src={likerId.photoUrl} alt="user" />
        </div>
      </div>
      <div>
        <Link to={`/viewUser/${likerId._id}/${2}/${0}`}>
          <p className="font-medium">
            {likerId.firstName} {likerId.lastName}
            {isPosterPremium && (
              <VerifiedIcon className="inline-block w-5 h-5 text-blue-500 ml-1" />
            )}
          </p>
        </Link>
        <p className="text-xs text-base-content/50">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Likes;
