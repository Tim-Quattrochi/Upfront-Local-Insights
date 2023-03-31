import React, { useState, useEffect } from "react";
import LeaveRating from "./LeaveRating";
import { Link } from "react-router-dom";
import ShowRating from "./ShowRating";
import ReviewModal from "./ReviewModal";
import SubmitBusiness from "../pages/SubmitBusiness";
import placeHolderImage from "../assets/Place-holder-image.svg";
const ListBusiness = ({ businesses }) => {
  const [searchFilter, setSearchFilter] = useState(businesses);
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    setSearchFilter(businesses);
  }, [businesses]);

  /**
   * The function takes in an event, sets the search term to the value of the event, filters the
   * businesses based on the search term, and sets the search filter to the results
   */
  /* Filtering the businesses based on the search term. */
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const results = businesses.filter((business) =>
      business.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );

    setSearchFilter(results);
    console.log(searchFilter);
  };

  return (
    <>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search businesses"
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 absolute right-0 top-0 mt-3 mr-4 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {searchFilter &&
          searchFilter.map((business) => (
            <div
              key={business._id}
              className="bg-white rounded-lg shadow-md"
            >
              <div className="relative">
                {business.photo ? (
                  <img
                    src={`http://localhost:3001/${business.photo}`}
                    alt=""
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                ) : (
                  <img
                    src={placeHolderImage}
                    alt=""
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                )}

                <div className="absolute top-0 right-0 px-2 py-1 bg-gray-800 text-white rounded-bl-lg">
                  {business.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-center">
                  <Link
                    to={`/businesses/${business._id}`}
                    className="text-gray-800 hover:text-gray-600"
                  >
                    {business.name}
                  </Link>
                </h3>
                <div className="text-gray-700 text-sm mb-2 text-center">
                  📍 {business.address}
                </div>
                <p className="text-gray-700 text-sm mb-2">
                  ☏ <a href="tel:PHONE_NUM"> {business.phone}</a>
                </p>
                <p className="text-gray-700 text-base mb-4">
                  {business.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={`http://localhost:3001/${business.photo}`}
                      alt=""
                      className="w-8 h-8 object-cover rounded-full mr-2"
                    />
                    <p className="text-gray-700 text-sm">
                      {business.name}
                    </p>

                    <ShowRating rating={business.rating} />
                    {Math.round(business.rating)}
                  </div>
                  <p className="text-gray-700 text-sm">
                    {business.email}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-700 text-sm hover:text-gray-600"
                  >
                    {business.website}
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ListBusiness;
