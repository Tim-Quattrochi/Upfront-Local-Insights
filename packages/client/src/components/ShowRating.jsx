/* This code defines a React component called `ShowRating` that takes in a prop called `rating`. The
component returns a div with a class of "rating" and contains an array of 5 SVG elements. The fill
color of each SVG element is determined by whether its index is less than the rounded value of the
`rating` prop. If it is, the fill color is set to "#ffd700" (gold), otherwise it is set to "#e5e7eb"
(light gray). The SVG elements are defined using a path that creates a star shape. The component is
exported as the default export of the module. */

import React from "react";

const ShowRating = ({ business }) => {
  const { rating, reviews } = business;
  console.log(rating);
  const roundedRating = rating ? Math.round(rating) : 0;
  return (
    <div className="flex items-center gap-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
          fill={i < roundedRating ? "#ffd700" : "#e5e7eb"}
          className="w-5 h-5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="text-sm text-muted-foreground">
        ({reviews?.length} reviews)
      </span>
    </div>
  );
};

export default ShowRating;
