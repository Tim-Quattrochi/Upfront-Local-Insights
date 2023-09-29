import React from "react";

const LoadingBar = () => {
  return (
    <div className="mt-32 flex justify-center content-center">
      <div
        className="self-center inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
      </div>
      <span className="ml-5 text-primary text-lg">...Loading</span>
    </div>
  );
};

export default LoadingBar;
