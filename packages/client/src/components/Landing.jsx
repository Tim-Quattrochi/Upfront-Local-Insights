import landingImage from "../assets/landingImage.svg";
import { Link } from "react-router-dom";
import bgImage from "../assets/bgImage.png";

const Landing = () => {
  return (
    <>
      <div className=" w-full flex flex-wrap justify-center content-center mx-auto min-h-screen bg-bg">
        <div className="max-w-md">
          <h1 className=" text-2xl mb-11 relative text-center text-cyan-700 border border-1  border-cyan-500 shadow-md rounded ">
            Real and{" "}
            <span className="italic underline decoration-pink-500">
              unbiased
            </span>{" "}
            Business reviews
          </h1>
          {/* <img
            className="w-full  object-cover lg:scale-125 md:w-full sm:object-scale"
            src={}
            alt=""
          /> */}
          <div className="py-6 mt-5 text-xl">
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
