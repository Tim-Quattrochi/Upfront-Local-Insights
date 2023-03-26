import React from "react";
import { Link } from "react-router-dom";
import SubmitBusiness from "../pages/SubmitBusiness";

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={"/"}>
          <a className="btn btn-ghost normal-case text-xl">
            Upfront Local Insights
          </a>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="flex gap-2">
          <Link to={"/login"}>
            <button className="btn">Login</button>
          </Link>
          <Link to={"/register"}>
            <button className="btn">Register</button>
          </Link>

          <SubmitBusiness />

          <Link to={"/businesses"}>
            <button className="btn">Search</button>
          </Link>
        </div>
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
