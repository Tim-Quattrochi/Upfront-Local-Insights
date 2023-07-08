import React from "react";
import ShowRating from "./ShowRating";
import { Link } from "react-router-dom";
import { formatDate } from "../utilities/formateDate";
import { imagePath } from "../../config/constants";

const SelfReviews = ({ userReviews }) => {
  return (
    <div className="flex flex-wrap">
      {userReviews &&
        userReviews.map((review) => (
          <div
            key={review._id}
            className="prose sm:w-full p-6 border rounded-md shadow-md md:w-1/2 mx-auto mb-4"
          >
            <div className=" flex justify-around text-lg font-semibold text-center">
              {/* This is a React Router `Link` component that creates a clickable link to a specific
              business page. The `to` prop specifies the URL path to the business page, which
              includes the business ID extracted from the `userReviews` array using the `map`
              method. The `review.business.name` is the text content of the link that will be
              displayed to the user.  */}
              <Link
                to={`/businesses/${userReviews.map(
                  (userReview) => userReview.business._id
                )}`}
              >
                {" "}
                {review.business.name}
              </Link>
              <div className="text-xs font-light m-1 p-1 italic">
                {formatDate(review.createdAt)}
              </div>
            </div>
            <div className=" flex justify-center text-yellow-400 text-lg mb-2 text-center p-3 ">
              <ShowRating rating={review.rating} />
              <div className="ml-2">{Math.round(review.rating)}</div>
            </div>
            <p className=" text-gray-700 whitespace-pre-line text-center ">
              {review.comment ? review.comment : "No comment left."}
            </p>

            {review.photo ? (
              <img
                src={`${imagePath}${review.photo}`}
                alt="User's review picture"
                className="h-32 w-64 mt-4 rounded-md shadow-md"
              />
            ) : (
              ""
            )}
          </div>
        ))}
    </div>
  );
};

export default SelfReviews;
