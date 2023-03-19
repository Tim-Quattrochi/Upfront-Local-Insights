import React, { useState, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useAuthState } from "../Context";

const LeaveRating = ({ businessId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [img, setImg] = useState(null);

  const { user } = useAuthState();

  const axios = useAxiosPrivate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit the form data to the server

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("comment", comment);
    formData.append("rating", rating);
    formData.append("user", user._id);

    try {
      const response = await axios.post(
        `review/${businessId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/formdata" },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }

    console.log(`Rating: ${rating}, Comment: ${comment}`);
    // Reset the form after submission
    setRating(0);
    setComment("");
  };

  //get secure url from server

  return (
    <form
      onSubmit={handleSubmit}
      type="multipart/form-data"
      className="flex flex-col flex-wrap justify-center align-center items-center"
    >
      <div className="rating">
        <input
          type="radio"
          name="rating"
          className="mask mask-star-2 bg-accent"
          value="1"
          checked={rating === 1}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <input
          type="radio"
          name="rating"
          className="mask mask-star-2 bg-accent"
          value="2"
          checked={rating === 2}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <input
          type="radio"
          name="rating"
          className="mask mask-star-2 bg-accent"
          value="3"
          checked={rating === 3}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <input
          type="radio"
          name="rating"
          className="mask mask-star-2 bg-accent"
          value="4"
          checked={rating === 4}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <input
          type="radio"
          name="rating"
          className="mask mask-star-2 bg-accent"
          value="5"
          checked={rating === 5}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </div>
      <label>
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="textarea textarea-accent textarea-sm w-full max-w-xs"
        />
      </label>
      <img src={img} alt="" />
      <button type="submit" className="btn btn-info mb-2">
        Submit Review
      </button>
      <input
        type="file"
        name="file"
        className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
    </form>
  );
};

export default LeaveRating;
