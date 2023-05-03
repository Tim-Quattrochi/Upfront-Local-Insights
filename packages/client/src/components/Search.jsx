import React from "react";

const Search = ({ searchTerm, handleSearch }) => {
  return (
    <div className="  flex m-5 justify-center">
      <input
        name={searchTerm}
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search"
        className="input input-success input-sm w-full max-w-xs"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 relative mt-1 mr-4 text-gray-400 "
        viewBox="0 0 24 24"
        fill="white"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
  );
};

export default Search;
