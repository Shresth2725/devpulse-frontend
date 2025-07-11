import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Body;
