import React, { useState, useEffect } from "react";

const LoadingBar = () => {
  const [text, setText] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prevText) => {
        if (prevText === "Loading...") {
          return "Loading businesses for you";
        } else if (prevText === "Loading businesses for you...") {
          return "Almost done!";
        } else if (prevText === "Almost done!..........") {
          return "Loading businesses for you";
        } else {
          return prevText + ".";
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
      <div className="flex justify-center items-center ">
        <div
          className="inline-block h-20 w-20 animate-spin-slow rounded-full border-8 border-t-info border-solid border-current"
          role="status"
        >
          <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip:rect(0,0,0,0)"></span>
        </div>
        <span className="ml-5 text-primary text-4xl font-semibold">
          {text}
        </span>
      </div>
    </div>
  );
};

export default LoadingBar;
