import React from "react";

const ProfileCard = ({ user }) => {
  const { photoUrl, firstName, lastName, about, age, gender } = user;

  return (
    <div className="bg-[#1F2937] text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      <div className="flex flex-col items-center p-6">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow-md"
        />
        <h2 className="mt-4 text-xl font-semibold text-center">
          {firstName} {lastName}
        </h2>
        <p className="text-gray-300 text-sm mt-1 text-center px-2">
          {about || "No description available."}
        </p>
        <div className="mt-3 text-gray-400 text-sm text-center">
          <p>
            Age: <span className="font-medium text-white">{age || "N/A"}</span>
          </p>
          <p>
            Gender:{" "}
            <span className="font-medium text-white capitalize">
              {gender || "N/A"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
