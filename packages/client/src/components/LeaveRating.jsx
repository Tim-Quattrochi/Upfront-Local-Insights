import React, { useState } from "react";
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

  let { state } = useLocation();

  if (!state) {
    state = null;
  }

  console.log(singleBusinessId);

  const { user, loggedInUser } = useAuthState();
  console.log(user);

  const axios = useAxiosPrivate();
  console.log(state);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit the form data to the server

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

      const { rating } = response.data;

      const updateRating = await axios.put(
        `business/${singleBusinessId}`
      ); //update business overall rating.

      console.log(updateRating);
      setRating(updateRating.data.rating);
      setShowRating(updateRating.data.rating);

      setShowToast(true);

      console.log(response.data);
      //grab the newly created review and update the review state.
      setReviews((prev) => [...prev, response.data]);

      //I want to take the response and have it update the reviews it state to re-render the SingleBusiness Component.
      setShowForm(false);
      setShowToast(true); // show the toast
      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      setShowToast(false);

      console.log(error);
    }

    console.log(`Rating: ${rating}, Comment: ${comment}`);
    // Reset the form after submission
    setRating(0);
    setComment("");
  };

  return (
    <>
      {showToast && (
        <Toast
          position="toast-end toast-middle"
          appearance="alert-info"
          message="Review Posted."
        />
      )}
      <button
        className="btn"
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? "hide" : "show"}
      </button>

      {showForm && (
        <div>
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
                checked={currentRating}
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
            <button type="submit" className="btn btn-info mb-2">
              Submit Review
            </button>
            <FileUpload setSelectedFile={setSelectedFile} />
          </form>
        </div>
      )}
    </>
  );
};

export default LeaveRating;
