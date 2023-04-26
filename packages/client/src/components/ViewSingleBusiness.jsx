import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../hooks/useAxios";
import LeaveRating from "./LeaveRating";
import { formatDate } from "../utilities/formateDate";
import { formatPhone } from "../utilities/formatPhone";
import { BsFillTelephoneForwardFill } from "react-icons/Bs";
import { MdLocationOn } from "react-icons/Md";
import { FaRegStar } from "react-icons/fa";
import { TbWorldWww } from "react-icons/Tb";

import ShowRating from "./ShowRating";
import placeHolderImage from "../assets/Place-holder-image.svg";

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
    <div className=" min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md">
        <div className="relative">
          {singleBusiness.photo ? (
            <img
              src={`http://54.90.137.205/${singleBusiness.photo}`}
              alt=""
              className="w-full h-64 object-none rounded-t-lg"
            />
          ) : (
            <img
              src={placeHolderImage}
              alt=""
              className="w-full h-64 object-cover rounded-t-lg"
            />
          )}
        </div>
        <div className=" prose flex flex-col mt-4  mx-auto border rounded-md bg-base-100 shadow-md items-center justify-center p-6 py-4 text-center sm:p-8 ">
          <h1 className="lg:text-3xl xs:text-2xl text-secondary font-bold mb-4 ">
            {singleBusiness.name}
          </h1>
          <div className="text-neutral text-base italic m-1 mb-4">
            {singleBusiness.description}
          </div>
          <div className=" flex text-gray-700 md:text-lg text-center">
            <MdLocationOn size={24} fill={"red"} />
            {singleBusiness.address}
          </div>

          <div className="flex items-center justify-between mb-4 mt-2">
            <div className="flex items-center ">
              {" "}
              <BsFillTelephoneForwardFill
                style={{ marginRight: "4px" }}
                size={20}
              />
              <a href="tel:PHONE_NUM">
                {formatPhone(singleBusiness.phone)}
              </a>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <a
              href={singleBusiness.website}
              target="_blank"
              rel="noreferrer"
              className="flex text-gray-700 text-sm hover:text-gray-600"
            >
              <TbWorldWww
                size={24}
                fill={"blue"}
                style={{ marginRight: "4px" }}
              />{" "}
              {singleBusiness.website}
            </a>
            <div className="flex items-center"></div>
          </div>
        </div>
        <div className="flex  tracking-wide m-5 justify-center ">
          <div className="flex w-full items-center text-center mr-2 bg-base-100 text-5xl text-secondary border rounded-md md:shadow ">
            Reviews
            <FaRegStar fill="gold" size={36} />
          </div>{" "}
        </div>

        {reviews &&
          reviews.map((review) => (
            <div
              key={review._id}
              className="prose sm:w-full p-6 border rounded-md shadow-md bg-base-100 md:w-1/2 mx-auto mb-4"
            >
              <div className=" flex justify-around text-lg font-semibold text-center">
                {review.user.name || review.name}
                <div className="text-xs font-light m-1 p-1 italic">
                  {formatDate(review.createdAt)}
                </div>
              </div>
              <div className=" flex justify-center text-yellow-400 text-lg mb-2 text-center p-3 ">
                <ShowRating rating={review.rating} />
                <div className="ml-2">
                  {Math.round(review.rating)}
                </div>
              </div>
              <p className=" text-gray-700 whitespace-pre-line text-center ">
                {review.comment}
              </p>

              {review.photo ? (
                <img
                  src={`http://54.90.137.205/${review.photo}`}
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
