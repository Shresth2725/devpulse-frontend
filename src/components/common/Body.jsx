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
      const user = await axios.get(baseUrl + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(user.data));
    } catch (err) {
      if (err.status === 400) navigate("/login");
    }
  };

  const fetchNotification = async () => {
    try {
      const res = await axios.get(baseUrl + "/notification/receive", {
        withCredentials: true,
      });
      // console.log(res.data);

      dispatch(setNotification(res.data.data));
    } catch (err) {
      navigate("error");
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (userData) fetchNotification();
  });

  useEffect(() => {
    fetchUser();
    if (userData) fetchNotification();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
