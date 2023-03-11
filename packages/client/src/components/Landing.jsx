import landingImage from "../assets/landingImage.svg";
import { Link } from "react-router-dom";
import useFetchPrivate from "../hooks/useFetchPrivate";

const Landing = () => {
  const fetch = useFetchPrivate();

  const handleClick = async () => {
    const options = {
      method: "GET",
    };

    await fetch("review", options).then((res) => {
      console.log(res);
    });
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
    </>
  );
};

export default Landing;
