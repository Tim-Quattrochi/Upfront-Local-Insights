import { Link } from "react-router-dom";
import { formatPhone } from "../utilities/formatPhone";
import ShowRating from "./ShowRating";
import placeHolderImage from "../assets/Place-holder-image.svg";
import { BsFillTelephoneForwardFill } from "react-icons/bs";

const BusinessCard = ({ business }) => {
  return (
    <div className="max-w-md mx-auto m-4 bg-white rounded-xl  hover:bg-slate-100 shadow-md overflow-hidden md:max-w-2xl iphone12:h-1/6">
      <div className="md:flex">
        <div className="md:shrink-0">
          {business.photo ? (
            <Link to={`/businesses/${business._id}`}>
              <img
                src={`/${business.photo}`}
                alt="Photo of the establishment"
                className="h-48 w-full object-fit md:h-full md:w-48"
              />
            </Link>
          ) : (
            <Link to={`/businesses/${business._id}`}>
              <img
                src={placeHolderImage}
                alt=""
                className="h-48 w-full object-fit md:h-full md:w-48"
              />
            </Link>
          )}
        </div>
        <div className="p-8">
          <div className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            <Link to={`/businesses/${business._id}`}>
              {business.name}
            </Link>
          </div>
          <Link
            to={`/businesses/${business._id}`}
            className=" tracking-wide text-sm text-indigo-500 font-semibold"
          >
            {business.description}
          </Link>
          <p className=" mt-2 text-slate-500">{business.address}</p>
          <p className="flex mt-2 text-slate-500">
            <BsFillTelephoneForwardFill
              style={{ marginRight: "4px" }}
            />{" "}
            {formatPhone(business.phone)}
          </p>
        </div>
        <div className="flex justify-start mx-auto">
          <ShowRating rating={business.rating} />
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
