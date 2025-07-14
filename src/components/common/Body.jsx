import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { baseUrl } from "../../utilis/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utilis/userSlice";

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
      // console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
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
