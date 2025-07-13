import React from "react";

const FeedCard = ({ user }) => {
  const { photoUrl, firstName, lastName, about } = user;

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
            <button className="btn bg-red-500 text-white">Ignore</button>
            <button className="btn bg-green-500 text-white">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
