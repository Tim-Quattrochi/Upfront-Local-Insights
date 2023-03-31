import landingImage from "../assets/landingImage.svg";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="container mx-auto ">
        <div className="hero-content">
          <div className="max-w-md">
            <h1 className="text-2xl mb-2  text-white">
              Real and unbiased business reviews
            </h1>
            <img
              className="object-fit scale-125 h-72 w-100"
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
    </>
  );
};

export default Landing;
