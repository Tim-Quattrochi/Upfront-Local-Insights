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
    <section className="min-h-screen flex justify-center items-center  py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#4c6ef5] to-primary">
      <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary-foreground sm:text-5xl md:text-6xl">
            Welcome to Local Insights
          </h1>
          <p className="max-w-[700px] text-primary-foreground md:text-xl">
            Evaluate and score your preferred local establishments.
            Assist others in discovering the top spots in the
            community. Make knowledgeable choices.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to={"/register"} className="w-full sm:w-auto">
            <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
