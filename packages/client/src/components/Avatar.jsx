import React from "react";

export const Avatar = ({ name }) => {
  return (
    <div className="m-2 px-4">
      <div className="relative inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 lg:w-20 lg:h-20 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-4 border-white shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <span className="text-sm md:text-2xl lg:text-xl text-white font-semibold">
          {name.toUpperCase()}
        </span>
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
          <svg
            className="w-4 h-3 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
