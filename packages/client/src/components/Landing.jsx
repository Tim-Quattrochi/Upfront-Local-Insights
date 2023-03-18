import landingImage from "../assets/landingImage.svg";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState } from "react";

const Landing = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const axios = useAxiosPrivate();

  const handleClick = async () => {
    try {
      const response = await axios.get("review");
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <>
      <div className="container mx-auto ">
        <div className="hero-content">
          <div className="max-w-md">
            <h1 className="text-2xl mb-2  text-white">
              Real and unbiased business reviews
            </h1>
            <img
              className="object-fill h-52 w-100"
              src={landingImage}
              alt=""
            />
            <p className="py-6">
              We want your reviews to be seen, good or bad.
            </p>
          </div>
        </div>
      </div>
      <Link to={"/register"}>
        <button className="btn btn-primary  z-10">Get Started</button>
      </Link>
      <button onClick={handleClick}>Press Me</button>
      {data && (
        <div>
          <h2>Private Data</h2>
          <p>{error ? "Protected stuff" : JSON.stringify(data)}</p>
        </div>
      )}
    </>
  );
};

export default Landing;
