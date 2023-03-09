import { useState } from "react";
import registerImage from "../assets/registerImage.svg";
import {
  loginUser,
  useAuthState,
  useAuthDispatch,
  registerUser,
} from "../Context";

import { useNavigate } from "react-router-dom";

// import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function Register() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  };

  const [formData, setFormData] = useState(initialValues);

  //   const [value, setValue] = useLocalStorage("user", null);
  const dispatch = useAuthDispatch();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    let payload = formData;
    try {
      let response = await registerUser(dispatch, payload);
      console.log(response);
      if (response && response.user) {
        navigate("/");
      } else if (response && response.error) {
        setError(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={registerImage}
        alt="people gather by a laptop"
        style={{ maxHeight: "100%" }}
      />
      <div className="flex min-h-full items-center bg-primary mx-auto mt-5 justify-center content-center py-2 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <h2 className="  text-2xl font-bold tracking-tight text-white">
                  Register now to see what consumers are saying about
                  local businesses!
                </h2>
              </div>
              <form
                className="mt-8 space-y-6"
                onSubmit={handleRegistration}
              >
                <input
                  type="hidden"
                  name="remember"
                  defaultValue="true"
                />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="firstName" className="sr-only">
                      First Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="full name"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="First Name"
                      onChange={handleInputChange}
                      value={formData.name}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Email"
                      onChange={handleInputChange}
                      value={formData.email}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Password"
                      onChange={handleInputChange}
                      value={formData.password}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="sr-only"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Confirm Password"
                      onChange={handleInputChange}
                      value={formData.confirmPassword}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      to="/login"
                      className="font-medium text-sky-900 hover:text-indigo-500"
                    >
                      Already have an account?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-base-100 py-2 px-4 text-sm font-medium text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      {/* <LockClosedIcon
                        className="h-5 w-5 text-indigo-500 group-hover:text-white"
                        aria-hidden="true"
                      /> */}
                    </span>
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
