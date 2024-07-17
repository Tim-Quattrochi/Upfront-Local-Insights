import React from "react";

export const Avatar = ({ name }) => {
  return (
    <div className="avatar placeholder">
      <div className="bg-neutral text-neutral-content w-8 md:w-12 rounded-full p-2 m-2">
        <span className="text-xs md:text-md lg:text-lg">
          {name.toUpperCase()}
        </span>
      </div>
    </div>
  );
};
