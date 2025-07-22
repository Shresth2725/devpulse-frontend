import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { baseUrl } from "../../utilis/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utilis/userSlice";
import { setNotification } from "../../utilis/notificationSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.User);

  const fetchUser = async () => {
    if (userData) return;

    try {
      const res = await axios.get(baseUrl + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || "";

      console.warn("User fetch failed:", status, message);

      // If token is invalid or missing, redirect to login
      if (status === 400 && message.toLowerCase().includes("token")) {
        dispatch(addUser(null));
        navigate("/login");
      }
    }
  };

  const fetchNotification = async () => {
    try {
      const res = await axios.get(baseUrl + "/notification/receive", {
        withCredentials: true,
      });
      dispatch(setNotification(res.data.data));
    } catch (err) {
      console.error("Notification fetch failed:", err.message);
      navigate("/error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userData) fetchNotification();
  }, [userData]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
