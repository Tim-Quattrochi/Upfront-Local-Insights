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
    <div className="navbar sm:flex-1 bg-red-300  justify-between  text-white border-b-2">
      <Link to={"/"}>
        <div className="btn btn-ghost normal-case text-sm flex-nowrap">
          Upfront Local Insights
        </div>
      </Link>
      <div className="flex-none gap-2">
        <div className="flex gap-2">
          <SubmitBusiness />
        </div>
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar"
          >
            {/* /* This code is rendering an Avatar component with a circular shape and a width of 12. The
           Avatar component is receiving a prop called "name" which is being set to the first letter
           of the user's name if they are logged in, or "Guest" if they are not logged in. The
           Avatar component is likely responsible for rendering a user's profile picture or a
           default icon if no picture is available. */}
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
              <Link
                to={auth.user.isLoggedIn ? "/profile" : "/login"}
                className="justify-between"
              >
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
