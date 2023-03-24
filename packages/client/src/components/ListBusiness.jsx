import React from "react";
import LeaveRating from "./LeaveRating";
import { Link } from "react-router-dom";

const ListBusiness = ({ businesses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {businesses &&
        businesses.map((business) => (
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
                <span>"No Photo yet</span>
              )}

              <div className="absolute top-0 right-0 px-2 py-1 bg-gray-800 text-white rounded-bl-lg">
                {business.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">
                <Link
                  to={`/businesses/${business._id}`}
                  className="text-gray-800 hover:text-gray-600"
                >
                  {business.name}
                </Link>
              </h3>
              <p className="text-gray-700 text-sm mb-2">
                📍 {business.address}
              </p>
              <p className="text-gray-700 text-sm mb-2">
                ☏ {business.phone}
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
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 fill-current text-gray-600 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                  <Link
                    to={"/businesses/leave-rating"}
                    state={{
                      businessId: business._id,
                      businessName: business.name,
                    }}
                    className="text-gray-700 text-sm hover:text-gray-600"
                  >
                    Leave a review
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListBusiness;
