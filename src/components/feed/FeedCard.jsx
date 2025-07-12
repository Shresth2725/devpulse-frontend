import React from "react";

const FeedCard = ({ user }) => {
  console.log(user);

  const { photoUrl, firstName, lastName, about } = user;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure className="p-10">
          <img src={photoUrl} alt={firstName + "Picture"} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          <div className="card-actions justify-center mt-5">
            <button className="btn bg-red-500">Ignore</button>
            <button className="btn bg-green-500">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
