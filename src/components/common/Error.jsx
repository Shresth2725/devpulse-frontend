import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/404-error-3704182-3119148.png"
        alt="Error"
        className="w-72 mb-6"
      />
      <h1 className="text-4xl font-bold text-error mb-3">
        Oops! Something went wrong
      </h1>
      <p className="text-base-content text-lg mb-6">
        The page you're looking for doesn't exist or an error occurred.
      </p>
      <Link to="/" className="btn btn-primary">
        Go to Homepage
      </Link>
    </div>
  );
};

export default Error;
