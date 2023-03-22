import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../hooks/useAxios";
import LeaveRating from "./LeaveRating";

const ViewSingleBusiness = (props) => {
  const [singleBusiness, setSingleBusiness] = useState({});

  const { businessId } = useParams();

  console.log(businessId);

  useEffect(() => {
    const getSingleBusiness = async () => {
      const response = await axios
        .get(`business/${businessId}`)
        .then((data) => {
          console.log(data);
          if (data.data.business) {
            setSingleBusiness(data.data.business);
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

  return (
    <div className="flex flex-col items-center gap-8  ">
      {
        <div
          key={singleBusiness._id}
          className="w-full  bg-gray-100 overflow-hidden shadow-md rounded-xl"
        >
          <div className="px-6 py-8">
            <h3 className="text-3xl font-bold text-slate-700 mb-4">
              {singleBusiness.name}
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              {singleBusiness.description}
            </p>
            <div className="flex justify-between mb-4">
              <p className="text-gray-700 text-base">
                Category: {singleBusiness.category}
              </p>
              <p className="text-gray-700 text-base">
                📍{singleBusiness.address}
              </p>
              <span>
                <img
                  src={`http://localhost:3001/${singleBusiness.photo}`}
                  alt="Photo of particular business."
                />
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-gray-700 text-base">
                ☏ {singleBusiness.phone}
              </p>
              <p className="text-gray-700 text-base">
                {singleBusiness.email}
              </p>
            </div>
            <div className="flex justify-between mb-8">
              <p className="text-gray-700 text-base">
                <a
                  className="link link-hover"
                  href={singleBusiness.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {singleBusiness.website}
                </a>{" "}
              </p>
            </div>
          </div>
          <div className="px-6 pb-8">
            {singleBusiness.reviews &&
            singleBusiness.reviews.length > 0 ? (
              <div>
                <h4 className="text-2xl font-bold text-gray-800 mb-4 ">
                  Reviews:
                </h4>
                {singleBusiness &&
                  singleBusiness.reviews.map((review) => (
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
          <LeaveRating singleBusinessId={singleBusiness._id} />
        </div>
      }
    </div>
  );
};

export default ViewSingleBusiness;
