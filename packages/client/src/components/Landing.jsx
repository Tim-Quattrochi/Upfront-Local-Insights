import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthState } from "../Context";
import useServerCheck from "../hooks/useServerCheck";
import LoadingBar from "./LoadingBar";

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuthState();
  const serverStatus = useServerCheck("/health");

  useEffect(() => {
    if (user?.isLoggedIn) {
      navigate("/businesses");
    }
  }, []);

  if (!serverStatus) {
    return <LoadingBar />;
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold">
            Real consumer reviews
          </h1>
          <p className="py-6">
            We want your reviews to be seen, good or bad. Plenty of
            review sites are around, but we want to be different. We
            want consumers to be able to see the good and the bad, so
            they can make an informed decision.
          </p>
          <Link to={"/register"}>
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
