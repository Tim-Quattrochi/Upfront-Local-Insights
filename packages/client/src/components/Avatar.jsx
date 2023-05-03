import React from "react";

export const Avatar = ({ name }) => {
  return (
    <div className="avatar placeholder">
      <div className="bg-[#FFD700]  text-black w-12">
        <span>{name}</span>
      </div>
    </div>
  );
};
