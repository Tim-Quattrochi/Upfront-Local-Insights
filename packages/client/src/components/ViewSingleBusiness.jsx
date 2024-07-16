import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../hooks/useAxios";
import LeaveRating from "./LeaveRating";
import { formatDate } from "../utilities/formateDate";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import ShowRating from "./ShowRating";
import placeHolderImage from "../assets/Place-holder-image.svg";
import { imagePath } from "../../config/constants";
import { checkPic } from "../utilities/checkPic";

const ViewSingleBusiness = (props) => {
  const [singleBusiness, setSingleBusiness] = useState({});
  const [reviews, setReviews] = useState([]);
  const [currentRating, setCurrentRating] = useState();

  const { businessId } = useParams();

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
    <div className="bg-white">
      <div className="shadow-lg p-4 md:p-8 rounded-lg">
        <div className="relative h-64 md:h-96">
          {singleBusiness.photo ? (
            <img
              src={`${checkPic(singleBusiness.photo)}`}
              alt="Business Photo"
              className="w-full h-full object-cover rounded-t-lg"
            />
          ) : (
            <img
              src={placeHolderImage}
              alt="Placeholder"
              className="w-full h-full object-cover rounded-t-lg"
            />
          )}
        </div>
        <div className="prose flex flex-col mt-4 mx-auto border rounded-md bg-opacity-50 shadow-md p-6 py-4 text-center sm:p-8">
          <h1 className="text-3xl font-semibold text-black hover:underline">
            {singleBusiness.name}
          </h1>
          <div className="mt-2">
            <span className="font-bold text-xl">
              {singleBusiness.reviews?.length <= 0
                ? "Not Rated"
                : "Overall Rating"}
            </span>
            <ShowRating business={singleBusiness} />
          </div>
          <span className="text-gray-600">
            {singleBusiness.reviews?.length
              ? `${singleBusiness.reviews?.length} Reviews`
              : "No reviews yet!"}
          </span>
          <div className="text-sm text-indigo-500 font-semibold mt-4">
            {singleBusiness.description}
          </div>
          <div className="mt-4 text-gray-700">
            <MdLocationOn
              size={24}
              fill="red"
              className="inline mr-2"
            />
            {singleBusiness.address}
          </div>
          <div className="mt-2 flex items-center">
            <BsFillTelephoneForwardFill
              size={20}
              className="text-slate-500 inline mr-2"
            />
            <a
              href={`tel:${singleBusiness.phone}`}
              className="text-slate-500"
            >
              {singleBusiness.phone}
            </a>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <a
              href={singleBusiness.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-slate-500"
            >
              <TbWorldWww size={24} fill="blue" className="mr-2" />
              {singleBusiness.website}
            </a>
          </div>
        </div>
        <div className="flex mt-5 justify-center">
          <div className="flex items-center mr-2 text-2xl font-bold rounded-md shadow-md">
            <span className="mx-auto">
              {reviews.length > 0 ? "What People are Saying" : null}
            </span>
            {reviews.length > 0 ? (
              <FaRegStar fill="gold" size={36} />
            ) : null}
          </div>
        </div>
        {reviews &&
          reviews.map((review) => (
            <div
              key={review._id}
              className="prose w-full p-6 border rounded-md shadow-md bg-white md:w-1/2 mx-auto mb-4"
            >
              <div className="flex justify-between items-center text-xl font-semibold">
                {review.user.name || review.name}
                <div className="text-sm font-light italic">
                  {formatDate(review.createdAt)}
                </div>
              </div>
              <div className="flex justify-center items-center text-yellow-400 text-lg mb-2">
                <ShowRating rating={review.rating} />
                <div className="ml-2">
                  {Math.round(review.rating)}
                </div>
              </div>
              <p className="text-gray-700 text-center">
                {review.comment}
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
