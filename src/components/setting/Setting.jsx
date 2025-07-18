import React from "react";
import { Outlet, Link } from "react-router-dom";

const Setting = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="setting-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content area */}
      <div className="drawer-content flex flex-col">
        {/* Top navbar for mobile */}
        <div className="w-full navbar bg-base-200 lg:hidden px-4">
          <label htmlFor="setting-drawer" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <span className="ml-4 font-bold text-lg">Settings</span>
        </div>

        {/* Routed content */}
        <div className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side min-h-screen">
        <label htmlFor="setting-drawer" className="drawer-overlay"></label>
        <aside className="w-64 bg-base-200 p-6 border-r border-base-300 min-h-screen">
          <h1 className="text-xl font-bold mb-6">Settings</h1>
          <ul className="space-y-4">
            <li>
              <Link
                to="modes"
                className="block px-3 py-2 rounded-lg hover:bg-base-300 transition"
              >
                Modes
              </Link>
            </li>
            <li>
              <Link
                to="resetPassword"
                className="block px-3 py-2 rounded-lg hover:bg-base-300 transition"
              >
                Reset Password
              </Link>
            </li>
            <li>
              <Link
                to="deleteAccount"
                className="block px-3 py-2 rounded-lg hover:bg-base-300 transition"
              >
                Delete Account
              </Link>
            </li>
            <li>
              <Link
                to="about"
                className="block px-3 py-2 rounded-lg hover:bg-base-300 transition"
              >
                About
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Setting;
