import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../utilis/constant";
import { removeUser } from "../utilis/userSlice";
import { removeFeed } from "../utilis/feedSlice";
import { resetConnections } from "../utilis/connectionsSlice";

const Navbar = () => {
  const user = useSelector((store) => store.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        baseUrl + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(resetConnections());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="navbar-start">
          {user && (
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                <label
                  htmlFor="my-drawer"
                  className="btn btn-primary drawer-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <div className="min-h-full w-80 bg-base-200 text-base-content">
                  <div className="p-4 border-b border-base-300">
                    <h2 className="text-xl font-semibold">Menu</h2>
                  </div>
                  <ul className="menu p-4 space-y-2">
                    <li>
                      <Link
                        to="/connections"
                        className="flex items-center gap-3 hover:bg-base-300 rounded-lg p-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M4 15a4 4 0 013-3.87V9a4 4 0 118 0v2.13A4 4 0 0119 15v2H5v-2z"
                          />
                        </svg>
                        <span>Connections</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/requests"
                        className="flex items-center gap-3 hover:bg-base-300 rounded-lg p-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 4h16v16H4V4zm4 4h8v2H8V8zm0 4h6v2H8v-2z"
                          />
                        </svg>
                        <span>Requests</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {user ? (
          <div className="navbar-center">
            <Link to="/" className="btn btn-ghost text-xl">
              DevPulse
            </Link>
          </div>
        ) : (
          <div className="text-xl font-bold mr-20 fixed left-0 pl-10">
            DevPulse
          </div>
        )}

        {user && (
          <div className="navbar-end">
            <button className="btn btn-ghost btn-circle pr-4">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
            <div className="dropdown dropdown-end pr-2">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Photo"
                    src={user?.data?.photoUrl || user?.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
