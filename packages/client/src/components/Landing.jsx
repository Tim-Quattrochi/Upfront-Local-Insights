import landingImage from "../assets/landingImage.svg";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="prose mx-auto container min-h-screen  ">
        <div className="hero-content">
          <div className="max-w-md">
            <h1 className="text-2xl mb-2  text-black">
              Real and unbiased business reviews
            </h1>
            <img
              className="object-fit scale-125 h-72 w-100"
              src={landingImage}
              alt=""
            />
            <div className="py-6 text-lg">
              We want your reviews to be seen, good or bad.
            </div>
            <div className="py-6 ">
             Our goal is simple. We believe all consumer reviews should be seen. Google and Yelp! both hide reviews.
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
        
  
      </div>
      
      
    </>
  );
};

export default Landing;
