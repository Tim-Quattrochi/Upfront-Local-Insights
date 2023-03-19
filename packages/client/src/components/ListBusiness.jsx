import React from "react";
import LeaveRating from "./LeaveRating";

const ListBusiness = ({ businesses }) => {
  return (
    <div className="flex flex-col items-center gap-8  ">
      {businesses &&
        businesses.map((business) => (
          <div
            key={business._id}
            className="w-full  bg-gray-100 overflow-hidden shadow-md rounded-xl"
          >
            <div className="px-6 py-8">
              <h3 className="text-3xl font-bold text-slate-700 mb-4">
                {business.name}
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                {business.description}
              </p>
              <div className="flex justify-between mb-4">
                <p className="text-gray-700 text-base">
                  Category: {business.category}
                </p>
                <p className="text-gray-700 text-base">
                  📍{business.address}
                </p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-gray-700 text-base">
                  ☏ {business.phone}
                </p>
                <p className="text-gray-700 text-base">
                  {business.email}
                </p>
              </div>
              <div className="flex justify-between mb-8">
                <p className="text-gray-700 text-base">
                  <a
                    className="link link-hover"
                    href={business.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {business.website}
                  </a>{" "}
                </p>
              </div>
            </div>
            <div className="px-6 pb-8">
              {business.reviews.length > 0 ? (
                <div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4 ">
                    Reviews:
                  </h4>
                  {business.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="mb-8  border-white border-2 rounded"
                    >
                      <div className="flex flex-col items-center ">
                        <div>
                          <p className="text-gray-600 text-base">
                            User: {review.user.name}
                          </p>
                          <p className="text-gray-600 text-base">
                            <div className="font-bold">Rating:</div>
                            {review.rating}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-base ">
                        Comment: {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700 text-base">
                  No reviews yet. Be the first to leave one!
                </p>
              )}
              Link here to see more
            </div>
            <LeaveRating businessId={business._id} />
          </div>
        ))}
    </div>
  );
};

export default ListBusiness;
