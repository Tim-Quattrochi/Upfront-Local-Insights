import { Link } from "react-router-dom";
import { formatPhone } from "../utilities/formatPhone";
import ShowRating from "./ShowRating";
import placeHolderImage from "../assets/Place-holder-image.svg";
import { BsFillTelephoneForwardFill } from "react-icons/Bs";

const BusinessCard = ({ business }) => {
  return (
    <div class="max-w-md mx-auto m-4 bg-white rounded-xl hover:bg-slate-100 shadow-md overflow-hidden md:max-w-2xl">
      <div class="md:flex">
        <div class="md:shrink-0">
          {business.photo ? (
            <Link to={`/businesses/${business._id}`}>
              <img
                src={`http://54.90.137.205/${business.photo}`}
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
        <div class="p-8">
          <div class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            <Link to={`/businesses/${business._id}`}>
              {business.name}
            </Link>
          </div>
          <Link
            to={`/businesses/${business._id}`}
            class=" tracking-wide text-sm text-indigo-500 font-semibold"
          >
            {business.description}
          </Link>
          <p class=" mt-2 text-slate-500">{business.address}</p>
          <p class="flex mt-2 text-slate-500">
            <BsFillTelephoneForwardFill
              style={{ marginRight: "4px" }}
            />{" "}
            {formatPhone(business.phone)}
          </p>
        </div>
        <div className="flex justify-start">
          <ShowRating rating={business.rating} />
        </div>
      </div>
    </div>
    // <div
    //   className="flex justify-center p-5 w-1/2 mx-auto "
    //   key={business._id}
    // >
    //   <div className="flex flex-col xs:flex-row bg-white rounded-lg shadow-md hover:bg-slate-100 w-full">
    //     <div className="relative flex items-center sm:w-1/2 ">
    //       {business.photo ? (
    //         <Link to={`/businesses/${business._id}`}>
    //           <img
    //             src={`http://54.90.137.205/${business.photo}`}
    //             alt="Photo of the establishment"
    //             className="w-full h-48 object-fit rounded-t-lg xl:hidden"
    //           />
    //         </Link>
    //       ) : (
    //         <Link to={`/businesses/${business._id}`}>
    //           <img
    //             src={placeHolderImage}
    //             alt=""
    //             className="w-full h-48 object-fit rounded-t-lg xs:hidden"
    //           />
    //         </Link>
    //       )}
    //     </div>
    //     <div className="flex-1 p-4 xs:w-full">
    //       <h3 className="text-2xl font-bold mb-2">
    //         <Link
    //           to={`/businesses/${business._id}`}
    //           className="text-secondary hover:text-gray-600"
    //         >
    //           {business.name}
    //         </Link>
    //       </h3>
    //       <div className="text-neutral text-base italic mb-4">
    //         {business.description}
    //       </div>
    //       <p className="text-gray-700 text-sm mb-2">
    //         ☏{" "}
    //         <a href="tel:PHONE_NUM">{formatPhone(business.phone)}</a>
    //       </p>
    //       <div className="text-gray-700 md:text-lg mb-4">
    //         📍 {business.address}
    //       </div>
    //       <div className="flex items-center justify-between">
    //         <div className="flex items-center">
    //           <ShowRating rating={business.rating} />
    //           <div className="text-gray-600 ml-2 text-sm md:text-base xs:hidden">
    //             {business.reviews.length} Reviews
    //           </div>
    //         </div>
    //         <Link
    //           to={`/businesses/${business._id}`}
    //           className="xs:hidden text-secondary hover:text-gray-600"
    //         >
    //           View Business
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default BusinessCard;
