import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SubmitBusiness from "../pages/SubmitBusiness";
import { logout } from "../Context";
import { useAuthState, useAuthDispatch } from "../Context";
import { Avatar } from "./Avatar";

export const Navbar = () => {
  const auth = useAuthState();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const logoutToMain = async () => {
    await logout(dispatch);
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Upfront Local Insights
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-14  rounded-full">
              <Avatar
                name={
                  auth.user.user ? auth.user.user.name[0] : "Guest"
                }
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link
                to={auth.user.isLoggedIn ? "/profile" : "/login"}
                className="justify-start"
              >
                <li>Profile</li>
              </Link>
            </li>
            <li>
              <Link to={"/businesses"} className="justify-between">
                Businesses
              </Link>
            </li>
            <li>
              {auth.user.isLoggedIn ? (
                <a onClick={logoutToMain}>Logout</a>
              ) : (
                ""
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
