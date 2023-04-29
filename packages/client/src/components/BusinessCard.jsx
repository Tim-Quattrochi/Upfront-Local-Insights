import { Link } from "react-router-dom";
import { formatPhone } from "../utilities/formatPhone";
import ShowRating from "./ShowRating";
import placeHolderImage from "../assets/Place-holder-image.svg";

const BusinessCard = ({ business }) => {
  return (
    <div
      className=" flex justify-center p-5 w-1/2 mx-auto"
      key={business._id}
    >
      <div className="w-1/2 xs:w-full bg-white rounded-lg shadow-md  hover:bg-slate-100">
        <div className="relative">
          {/* /* This code is rendering an image element with a conditional statement. If the
           `business.photo` property exists, it will render an image with the source set to
           `http://54.90.137.205/${business.photo}` and alt text "Photo of the establishment". If
           `business.photo` does not exist, it will render a placeholder image with the source set
           to `placeHolderImage` and no alt text. The `className` properties are setting the styling
           for the image element. */}

          <div className="absolute top-0 right-0 px-2 py-1 bg-gray-800 text-white rounded-bl-lg">
            {business.category}
          </div>
        </div>

        {business.photo ? (
          <Link to={`/businesses/${business._id}`}>
            <img
              src={`http://54.90.137.205/${business.photo}`}
              alt="Photo of the establishment"
              className="w-1/4 mx-auto rounded-t-lg"
            />
          </Link>
        ) : (
          <Link to={`/businesses/${business._id}`}>
            <img
              src={placeHolderImage}
              alt=""
              className="w-full h-64 object-cover rounded-t-lg"
            />
          </Link>
        )}

        <h3 className="text-2xl font-bold text-center">
          <Link
            to={`/businesses/${business._id}`}
            className="text-secondary hover:text-gray-600"
          >
            {business.name}
          </Link>
          <div className=" text-neutral text-base italic m-1">
            {business.description}
          </div>
        </h3>
        <p className="text-gray-700 text-sm mb-2 text-right">
          ☏ <a href="tel:PHONE_NUM"> {formatPhone(business.phone)}</a>
        </p>
        <div className="text-gray-700 md:text-lg text-center">
          📍 {business.address}
        </div>

        <div className="flex items-center justify-center m-2 ">
          <ShowRating rating={business.rating} />
          <div className="text-gray-600 ml-2 text-sm md:text-base mt-1">
            {business.reviews.length} Reviews
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
