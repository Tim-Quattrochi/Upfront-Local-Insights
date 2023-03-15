import React, { useState } from "react";
import useFetchPrivate from "../hooks/useFetchPrivate";
import { useAuthState } from "../Context";

const LeaveRating = ({ businessId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { user } = useAuthState();

  const fetchPrivate = useFetchPrivate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit the form data to the server
    try {
      const response = await fetchPrivate(
        `review/${businessId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
        { rating, comment, user: user._id }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    console.log(`Rating: ${rating}, Comment: ${comment}`);
    // Reset the form after submission
    setRating(0);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rating">
        <input
          type="radio"
          name="rating"
          className="mask mask-star"
          value="1"
          checked={rating === 1}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <input
          type="radio"
          name="rating"
          className="mask mask-star"
          value="2"
          checked={rating === 2}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <input
          type="radio"
          name="rating"
          className="mask mask-star"
          value="3"
          checked={rating === 3}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <input
          type="radio"
          name="rating"
          className="mask mask-star"
          value="4"
          checked={rating === 4}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <input
          type="radio"
          name="rating"
          className="mask mask-star"
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
        />
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default LeaveRating;
