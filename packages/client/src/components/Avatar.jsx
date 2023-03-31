import React from "react";

export const Avatar = ({ name }) => {
  return (
    <div className="avatar placeholder">
      <div className="bg-neutral-focus text-neutral-content  w-12">
        <span>{name}</span>
      </div>
    </div>
  );
};
