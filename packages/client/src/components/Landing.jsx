import landingImage from "../assets/landingImage.svg";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className=" w-full flex flex-wrap justify-center content-center  min-h-screen ">
        <div className="max-w-md">
          <h1 className=" prose text-2xl mb-10 relative text-center text-cyan-700 border border-1  border-cyan-500 shadow-md rounded">
            Real and{" "}
            <span className="italic underline decoration-pink-500">
              unbiased
            </span>{" "}
            Business reviews
          </h1>
          <img
            className="  object-fit lg:scale-125 md:w-full sm:object-scale"
            src={landingImage}
            alt=""
          />
          <div className="py-6 text-xl">
            We want your reviews to be seen, good or bad.
          </div>
          <div className="py-6 ">
            Our goal is{" "}
            <span className="font-bold underline decoration-pink-500">
              simple.
            </span>
            We believe all consumer reviews should be seen. Google and
            Yelp! both hide reviews. We aim to provide full
            transparency.
          </div>
          <div className="mx-auto">
            <Link to={"/register"}>
              <button className="btn btn-primary mx-auto ">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
