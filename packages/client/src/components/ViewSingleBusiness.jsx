import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../hooks/useAxios";
import LeaveRating from "./LeaveRating";
import { formatDate } from "../utilities/formateDate";
import { FaRegStar } from "react-icons/fa";

import ShowRating from "./ShowRating";
import placeHolderImage from "../assets/Place-holder-image.svg";

const ViewSingleBusiness = (props) => {
  const [singleBusiness, setSingleBusiness] = useState({});
  const [reviews, setReviews] = useState([]);
  const [currentRating, setCurrentRating] = useState();

  const { businessId } = useParams();

  console.log(businessId);

  useEffect(() => {
    /**
     * The function gets a single business from the database and sets the state of the single business,
     * reviews and current rating
     */
    const getSingleBusiness = async () => {
      const response = await axios
        .get(`business/${businessId}`)
        .then((data) => {
          if (data.data) {
            setSingleBusiness(data.data);
            setReviews(data.data.reviews);
            setCurrentRating(data.data.rating);
          }
        })
        .catch((err) => console.log(err));
    };
    getSingleBusiness();
  }, [businessId]);

  return (
    <div className="bg-gray-100">
      <div className="bg-white rounded-lg shadow-md">
        <div className="relative">
          {singleBusiness.photo ? (
            <img
              src={`http://localhost:3001/${singleBusiness.photo}`}
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
            {singleBusiness.category}
          </div>
        </div>
        <div className="p-6 py-4 text-center sm:p-8 sm:m-8">
          <h3 className="text-2xl font-bold mb-4">
            {singleBusiness.name}
          </h3>
          <p className="text-gray-700 text-sm mb-2">
            📍 {singleBusiness.address}
          </p>
          <p className="text-gray-700 text-sm mb-2">
            maybe something else here?
          </p>
          <p className="text-gray-700 text-base mb-4">
            {singleBusiness.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center ">
              {" "}
              ☏ <a href="tel:PHONE_NUM">{singleBusiness.phone}</a>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <a
              href={singleBusiness.website}
              target="_blank"
              rel="noreferrer"
              className="text-gray-700 text-sm hover:text-gray-600"
            >
              {singleBusiness.website}
            </a>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 fill-current text-gray-600 mr-2"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
          </div>
          <div className="flex text-5xl font-bold tracking-wide m-3 justify-center ">
            <p className="mr-2 text-info">Reviews</p>{" "}
            <FaRegStar fill="gold" />
          </div>
        </div>

        {reviews &&
          reviews.map((review) => (
            <div
              key={review._id}
              className="sm:w-full p-6 border rounded-md shadow-md md:w-1/2 mx-auto mb-4"
            >
              <p className="text-lg font-semibold text-center">
                {review.user.name || review.name}
              </p>
              <p className="text-yellow-400 text-lg mb-2 text-center">
                {review.rating} <ShowRating rating={review.rating} />
              </p>
              <p className="text-gray-700 whitespace-pre-line text-center">
                {review.comment}
              </p>
              <div className="text-xs font-light m-1 p-1 italic">
                {formatDate(review.createdAt)}
              </div>
              {review.photo ? (
                <img
                  src={`http://localhost:3001/${review.photo}`}
                  alt="User's review picture"
                  className="h-32 w-64 mt-4 rounded-md shadow-md"
                />
              ) : (
                ""
              )}
            </div>
          ))}

        <LeaveRating
          singleBusinessId={singleBusiness._id}
          setReviews={setReviews}
          reviews={reviews}
          current
          Rating={currentRating}
        />
      </div>
    </div>
  );
};

export default ViewSingleBusiness;
