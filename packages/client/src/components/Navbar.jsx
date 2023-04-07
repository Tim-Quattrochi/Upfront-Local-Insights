import React from "react";
import { Link } from "react-router-dom";
import SubmitBusiness from "../pages/SubmitBusiness";
import { logout } from "../Context";
import { useAuthState, useAuthDispatch } from "../Context";
import { Avatar } from "./Avatar";

export const Navbar = () => {
  const auth = useAuthState();
  const dispatch = useAuthDispatch();

  return (
    <div className="navbar bg-gray-900 justify-between  text-white border-b-2">
      <Link to={"/"}>
        <a className="btn btn-ghost normal-case text-sm flex-nowrap">
          Upfront Local Insights
        </a>
      </Link>
      <div className="flex-none gap-2">
        <div className="flex gap-2">
          {/* Checking if the user is logged in. If they are, it will not show the register and login
      buttons. If they are not logged in, it will show the register and login buttons. */}
          {auth.user.isLoggedIn ? (
            ""
          ) : (
            <>
              <Link to={"/register"}>
                <div className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md hover:text-gray-300 transition-all">
                  Register
                </div>
              </Link>
              <Link to={"/login"}>
                <div className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md hover:text-gray-300 transition-all">
                  Login
                </div>
              </Link>
            </>
          )}

          <SubmitBusiness />
        </div>
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="rounded-full w-12">
              <Avatar
                name={
                  auth.user.user ? auth.user.user.name[0] : "Guest"
                }
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-accent rounded-box w-52"
          >
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
              </Link>
            </li>

            <li>
              {auth.user.isLoggedIn ? (
                <a onClick={() => logout(dispatch)}>Logout</a>
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
