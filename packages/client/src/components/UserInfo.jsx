import React from "react";
import { formatDate } from "../utilities/formateDate";
const UserInfo = ({ user, userReviews }) => {
  function checkLoggedIn(user, text) {
    return user.isLoggedIn ? text : "";
  }

  return (
    <div className="border bg-[#89CFF0] shadow-md mb-5">
      <h2 className="text-white text-center ">
        Name: {user?.user.name}
      </h2>
      <ul className="list-none text-center">
        <li className="text-white">Email: {user?.user.email}</li>
        <li className="text-white">
          Total Reviews: {userReviews?.length}
        </li>

        <li className="text-white">
          Account Created:{" "}
          {checkLoggedIn(user, formatDate(user?.user.createdAt))}
        </li>
      </ul>
    </div>
  );
};

export default UserInfo;
