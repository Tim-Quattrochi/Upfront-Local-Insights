import React from "react";

export const Avatar = ({ name }) => {
  return (
    <div className="avatar placeholder">
      <div className="bg-info  text-black w-14 ">
        <span className="mb-2 mr-2 ">{name}</span>
      </div>
    </div>
  );
};
