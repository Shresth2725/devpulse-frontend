import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../utilis/constant";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = async () => {
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New password and Confirm password are not the same!");
      return;
    }

    try {
      const res = await axios.patch(
        baseUrl + "/profile/password",
        {
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );

      if (res.data.message === "Password updated successfully") {
        setSuccess("Password updated successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(res.response.data || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response.data);
      navigate("error");
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">Reset Password</h1>

      <fieldset className="mb-4">
        <legend className="mb-1">What is your old Password?</legend>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </fieldset>

      <fieldset className="mb-4">
        <legend className="mb-1">What is your new Password?</legend>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </fieldset>

      <fieldset className="mb-4">
        <legend className="mb-1">Confirm your new Password</legend>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </fieldset>

      {error && (
        <div role="alert" className="alert alert-error my-2">
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div role="alert" className="alert alert-success my-2">
          <span>{success}</span>
        </div>
      )}

      <button
        className="btn btn-primary w-full mt-4"
        onClick={handlePasswordChange}
      >
        Change Password
      </button>
    </div>
  );
};

export default ResetPassword;
