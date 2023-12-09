import { useState, useEffect } from "react";
import registerImage from "../assets/registerImage.svg";
import {
  useAuthState,
  useAuthDispatch,
  registerUser,
} from "../Context";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import ShowError from "../components/ShowError";

export default function Register() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: null,
  };

  const [formData, setFormData] = useState(initialValues);

  const dispatch = useAuthDispatch();
  const auth = useAuthState();

  const navigate = useNavigate();

  const handleSetFormData = (data) => {
    setFormData({ ...formData, ...data });
  };

  const handleInputChange = (e) => {
    handleSetFormData({
      [e.target.name]: e.target.value,
      error: null,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return handleSetFormData({ error: "Passwords must match" });
    } else if (
      formData.password.length <= 8 ||
      formData.password.length >= 20
    ) {
      return handleSetFormData({
        error: "Password must be between 8 and 20 characters.",
      });
    }

    try {
      const response = await registerUser(dispatch, formData);

      if (response.data.user) {
        navigate("/businesses");
      }
    } catch (error) {
      dispatch({ type: "REGISTER_ERROR", error });
    }
  };

  return (
    <div className=" w-full min-h-screen max-w-md flex flex-col items-center justify-center mx-auto">
      <img
        src={registerImage}
        className="object-fit"
        alt="people gather by a laptop"
      />
      <div className=" flex flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Register an Account to review local businesses
          </h2>
          <form onSubmit={handleRegistration} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                name="name"
                type="text"
                autoComplete="full-name"
                placeholder="Enter your full name"
                required
                className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
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
                autoComplete="password"
                required
                className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="password"
                  required
                  className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="w-full m-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Register
              </button>

              {formData.error && (
                <ShowError
                  error={formData.error}
                  auth={auth?.user.errorMessage}
                />
              )}
            </div>
          </form>
          <div className="text-center mt-4">
            <span className="text-gray-600">
              Already have an account?{" "}
            </span>
            <div className="m-2">
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-600"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
