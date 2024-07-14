import { useState } from "react";
import { loginUser, useAuthDispatch, useAuthState } from "../Context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ShowError from "../components/ShowError";

const initialValues = {
  email: "",
  password: "",
  error: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialValues);
  const [loginLoading, setLoginLoading] = useState(false);
  const dispatch = useAuthDispatch();
  const {
    user: { errorMessage },
  } = useAuthState();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const response = await loginUser(dispatch, formData);

      if (response && response.data?.user) {
        navigate("/businesses");
      } else if (response && response.error) {
        setError(response.error);
      }
    } catch (error) {
      console.log("Something went wrong.");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bgImage">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome back! Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loginLoading ? "Submitting..." : "Login"}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">
            Don't have an account yet?{" "}
          </span>
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-600"
          >
            Register here
          </Link>
        </div>
        <span className="text-error py-2 px-2 mx-auto">
          <ShowError error={errorMessage} auth={null} />
        </span>
      </div>
    </div>
  );
}
