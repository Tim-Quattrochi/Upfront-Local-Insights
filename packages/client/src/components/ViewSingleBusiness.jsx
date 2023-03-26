import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../hooks/useAxios";
import LeaveRating from "./LeaveRating";
import ReviewModal from "./ReviewModal";

const ViewSingleBusiness = (props) => {
  const [singleBusiness, setSingleBusiness] = useState({});
  const [reviews, setReviews] = useState([]);

  const { businessId } = useParams();

  console.log(businessId);

  useEffect(() => {
    const getSingleBusiness = async () => {
      const response = await axios
        .get(`business/${businessId}`)
        .then((data) => {
          console.log(data);
          if (data.data) {
            console.log(data);
            setSingleBusiness(data.data);
            setReviews(data.data.reviews);
          }
        })
        .catch((err) => console.log(err));
    };
    getSingleBusiness();
    console.log(singleBusiness);
    return () => {
      console.log("unmounted");
    };
  }, [businessId]);

  console.log(singleBusiness);
  console.log(reviews);

  return (
    <div className="">
      <div
        key={singleBusiness._id}
        className="bg-white rounded-lg shadow-md"
      >
        <div className="relative">
          {singleBusiness.photo ? (
            <img
              src={`http://localhost:3001/${singleBusiness.photo}`}
              alt=""
              className="w-full h-64 object-cover rounded-t-lg"
            />
          ) : (
            <span>"No Photo yet</span>
          )}

          <div className="absolute top-0 right-0 px-2 py-1 bg-gray-800 text-white rounded-bl-lg">
            {singleBusiness.category}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4">
            {singleBusiness.name}
          </h3>
          <p className="text-gray-700 text-sm mb-2">
            📍 {singleBusiness.address}
          </p>
          <p className="text-gray-700 text-sm mb-2">
            ☏ {singleBusiness.phone}
          </p>
          <p className="text-gray-700 text-base mb-4">
            {singleBusiness.description}
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src={`http://localhost:3001/${singleBusiness.photo}`}
                alt=""
                className="w-8 h-8 object-cover rounded-full mr-2"
              />
              <p className="text-gray-700 text-sm">
                {singleBusiness.name}
              </p>
            </div>
            <p className="text-gray-700 text-sm">
              {singleBusiness.email}
            </p>
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
        </div>
        {reviews &&
          reviews.map((review) => (
            <div
              key={review._id}
              className="p-6 border rounded-md shadow-md"
            >
              <p className="text-lg font-semibold">
                {review.user.name || review.name}
              </p>
              <p className="text-yellow-400 text-lg mb-2">
                {review.rating} ⭐️
              </p>
              <p className="text-gray-700">{review.comment}</p>
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
        />
      </div>
    </div>
  );
};

export default ViewSingleBusiness;
