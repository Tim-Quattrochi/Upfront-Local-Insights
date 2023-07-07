import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthState } from "../Context";

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuthState();

  useEffect(() => {
    if (user?.isLoggedIn) {
      navigate("/businesses");
    }
  }, []);

  return (
    <>
      <div className=" w-full flex flex-wrap justify-center content-center mx-auto min-h-screen ">
        <div className="max-w-md mb-20">
          <h1 className=" text-2xl font-bold relative text-center text-cyan-700 border border-1  border-cyan-500 shadow-md rounded ">
            Real and{" "}
            <span className="italic underline decoration-pink-500">
              unbiased
            </span>{" "}
            Business reviews
          </h1>

          <div className="py-6 mt-5 text-xl">
            We want your reviews to be seen, good or bad.
          </div>
          <div className="py-6 text-center ">
            Our goal is{" "}
            <span className="font-bold underline  decoration-pink-500">
              simple.
            </span>
            <p className="bg-white shadow-md w-auto mt-2">
              We believe all consumer reviews should be seen. Google
              and Yelp! both hide reviews. We aim to provide full
              transparency.
            </p>
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
