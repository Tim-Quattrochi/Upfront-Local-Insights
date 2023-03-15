import React from "react";
import LeaveRating from "./LeaveRating";

const ListBusiness = ({ businesses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {businesses &&
        businesses.map((business) => (
          <div
            key={business._id}
            className="bg-white overflow-hidden shadow-md rounded-lg"
          >
            <div className="px-4 py-2">
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                {business.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {business.description}
              </p>
              <p className="text-gray-700 text-base mb-2">
                Category: {business.category}
              </p>
              <p className="text-gray-700 text-base mb-2">
                {business.address}
              </p>
              <p className="text-gray-700 text-base mb-2">
                {business.phone}
              </p>
              <p className="text-gray-700 text-base mb-2">
                {business.email}
              </p>
              <p className="text-gray-700 text-base mb-2">
                {business.website}
              </p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                View Reviews
              </button>
            </div>
            <LeaveRating businessId={business._id} />
          </div>
        ))}
    </div>
  );
};

export default ListBusiness;
