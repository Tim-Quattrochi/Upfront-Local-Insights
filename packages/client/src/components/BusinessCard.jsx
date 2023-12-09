import { Link } from "react-router-dom";
import ShowRating from "./ShowRating";
import placeHolderImage from "../assets/Place-holder-image.svg";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { checkPic } from "../utilities/checkPic";

const BusinessCard = ({ business }) => {
  return (
    <div className="max-w-md mx-auto m-4 bg-base-100 rounded-xl shadow-md hover:shadow-lg overflow-hidden">
      <div className="md:flex md:items-center">
        <div className="md:shrink-0">
          {business.photo ? (
            <Link to={`/businesses/${business._id}`}>
              <img
                src={`${checkPic(business.photo)}`}
                alt="Photo of the establishment"
                className="h-48 w-48 object-cover md:h-72 md:w-72 mx-auto"
              />
            </Link>
          ) : (
            <Link to={`/businesses/${business._id}`}>
              <img
                src={placeHolderImage}
                alt=""
                className="h-48 w-48 object-cover md:h-72 md:w-72 mx-auto"
              />
            </Link>
          )}
        </div>
        <div className="p-8">
          <div className="block mt-2 text-xl leading-tight font-semibold text-black hover:underline">
            <Link to={`/businesses/${business._id}`}>
              {business.name}
            </Link>
          </div>
          <Link
            to={`/businesses/${business._id}`}
            className="mt-2 text-indigo-600 font-medium text-base hover:underline"
          >
            {business.description}
          </Link>
          <p className="mt-4 text-slate-500">{business.address}</p>
          <p className="flex items-center mt-4 text-slate-500">
            <BsFillTelephoneForwardFill className="w-5 h-5 mr-2" />{" "}
            {business.phone}
          </p>
        </div>
      </div>
      <div className="mt-4 p-4 bg-info">
        <ShowRating rating={business.rating} />
      </div>
    </div>
  );
};

export default BusinessCard;
