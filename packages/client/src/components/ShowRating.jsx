import React from "react";

const ShowRating = ({ rating }) => {
  return (
    <div className="rating flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? "#ffd700" : "#e5e7eb"}
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2L15.09 8.36L22 9.82L17 14.64L18.18 21.21L12 17.77L5.82 21.21L7 14.64L2 9.82L8.91 8.36L12 2z"
          />
        </svg>
      ))}
    </div>
  );
};

export default ShowRating;
