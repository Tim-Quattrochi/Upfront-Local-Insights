/* This code defines a React component called `ShowRating` that takes in a prop called `rating`. The
component returns a div with a class of "rating" and contains an array of 5 SVG elements. The fill
color of each SVG element is determined by whether its index is less than the rounded value of the
`rating` prop. If it is, the fill color is set to "#ffd700" (gold), otherwise it is set to "#e5e7eb"
(light gray). The SVG elements are defined using a path that creates a star shape. The component is
exported as the default export of the module. */

import React from "react";

const ShowRating = ({ rating }) => {
  return (
    <div className="rating flex items-end content-center  justify-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="2 2 20 20"
          fill={i < Math.round(rating) ? "#ffd700" : "#ffffff"}
          className="h-8 w-7 border bg-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2L15.09 8.36L22 9.82L17 14.64L18.18 21.21L12 17.77L5.82 21.21L7 14.64L2 9.82L8.91 8.36L12 2z"
          />
        </svg>
      ))}
    </div>
  );
};

export default ShowRating;
