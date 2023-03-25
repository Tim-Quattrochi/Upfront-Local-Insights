import React, { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useAuthState } from "../Context";
import { FileUpload } from "./FileUpload";
import { useLocation } from "react-router-dom";

const LeaveRating = ({ singleBusinessId, setReviews }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [img, setImg] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

    try {
      const response = await axios.post(
        `review/${singleBusinessId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/formdata" },
        }
      );

      console.log(response.data);
      //grab the newly created review and update the review state.
      setReviews((prev) => [...prev, response.data]);

      //I want to take the response and have it update the reviews it state to re-render the SingleBusiness Component.

      setShowForm(false);
    } catch (error) {
      console.log(error);
    }

    console.log(`Rating: ${rating}, Comment: ${comment}`);
    // Reset the form after submission
    setRating(0);
    setComment("");
  };

  return (
    <>
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
                checked={rating === 1}
                onChange={(e) => setRating(Number(e.target.value))}
              />

              <input
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-primary"
                value="2"
                checked={rating === 2}
                onChange={(e) => setRating(Number(e.target.value))}
              />
              <input
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-primary"
                value="3"
                checked={rating === 3}
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
                c
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
