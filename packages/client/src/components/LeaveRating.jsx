import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useAuthState } from "../Context";
import { FileUpload } from "./FileUpload";
import { useLocation } from "react-router-dom";
import Toast from "./Toast";

const LeaveRating = ({
  singleBusinessId,
  setReviews,
  currentRating,
}) => {
  const [rating, setRating] = useState(currentRating);
  const [showRating, setShowRating] = useState(currentRating); //calculated rating after to render.
  const [comment, setComment] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [img, setImg] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let { state } = useLocation();

  if (!state) {
    state = null;
  }

  const { user } = useAuthState();

  const axios = useAxiosPrivate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit the form data to the server
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("businessId", singleBusinessId);
    formData.append("comment", comment);
    formData.append("rating", rating);
    formData.append("user", user.user._id);
    formData.append("name", user.user.name);

    try {
      const response = await axios.post(
        `review/${singleBusinessId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/formdata" },
        }
      );

      const updateRating = await axios.put(
        `business/${singleBusinessId}`
      ); //update business overall rating.

      setRating(updateRating.data.rating);
      setShowRating(updateRating.data.rating);

      setShowToast(true);

      //grab the newly created review and update the review state.
      setReviews((prev) => [...prev, response.data]);

      //I want to take the response and have it update the reviews it state to re-render the SingleBusiness Component.
      setShowForm(false);
      setShowToast(true); // show the toast
      setTimeout(() => setShowToast(false), 5000);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      //if the user is not logged in, show a user friendly error in a toast.
      if (error.response.statusText === "Unauthorized") {
        setErrorToast(true);
        setTimeout(() => setErrorToast(false), 5000);
      }

      if (error.response.data.error) {
        return setError({ errorMessage: error.response.data.error });
      }
    }

    // Reset the form after submission
    setRating(0);
    setComment("");
    setError(null);
  };

  //if an error for no rating shows and the user enters a
  //rating then the error will disappear.
  useEffect(() => {
    if (rating !== undefined) {
      setError(null);
    }
  }, [rating]);

  return (
    <>
      {showToast && (
        <Toast
          position="toast-end toast-middle"
          appearance="alert-info"
          message="Review Posted."
          onHide={() => setShowToast(false)}
        />
      )}

      {errorToast && (
        <Toast
          position="toast-end toast-middle"
          appearance="alert-error"
          error="true"
          errorMsg="You must be logged in."
          onHide={() => setErrorToast(false)}
        />
      )}

      <div>
        <div className="text-xl font-semibold underline-offset-2 text-center m-3 text-secondary ">
          Leave a review
        </div>
        <h1>{state && state.businessName}</h1>
        <form
          onSubmit={handleSubmit}
          type="multipart/form-data"
          className="flex flex-col flex-wrap justify-center align-center items-center"
        >
          <div className="rating">
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-primary"
              value="1"
              onChange={(e) => setRating(Number(e.target.value))}
            />

            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-primary"
              value="2"
              onChange={(e) => setRating(Number(e.target.value))}
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-primary"
              value="3"
              onChange={(e) => setRating(Number(e.target.value))}
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-primary"
              value="4"
              onChange={(e) => setRating(Number(e.target.value))}
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-primary"
              value="5"
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </div>
          <label className="m-4 p-1 text-slate-900">
            Comment:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="textarea textarea-bordered textarea-lg w-full max-w-xs"
            />
          </label>
          <img src={img} alt="" />

          {/* //is the form submitting? if so show a loading btn, if not
        //show regular btn */}

          {loading ? (
            <button className="btn btn-info loading">
              Submitting
            </button>
          ) : (
            <button type="submit" className="btn btn-info mb-2">
              Submit Review
            </button>
          )}

          {/* //error message */}

          {error && (
            <div
              className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700"
              role="alert"
            >
              <svg
                className="w-5 h-5 inline mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div>
                <span className="font-medium">Error</span>{" "}
                {error && error.errorMessage}
              </div>
            </div>
          )}

          <FileUpload setSelectedFile={setSelectedFile} />
        </form>
      </div>
    </>
  );
};

export default LeaveRating;
