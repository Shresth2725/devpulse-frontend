import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../utilis/constant";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await axios.post(baseUrl + "/deleteUser", {}, { withCredentials: true });
      setMessage("Account deleted successfully.");
      navigate("/login");
    } catch (err) {
      setMessage(
        "Error deleting account: " + (err.response?.data || err.message)
      );
      navigate("error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-md bg-base-200 text-center">
      <h1 className="text-2xl font-bold mb-4">Delete Account</h1>
      <p className="mb-4 text-sm text-warning">
        Warning: This action is permanent and cannot be undone.
      </p>
      <button onClick={handleDeleteUser} className="btn btn-error btn-wide">
        Delete My Account
      </button>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
};

export default DeleteAccount;
