import { useState } from "react";
import registerImage from "../assets/registerImage.svg";
import { loginUser, useAuthState, useAuthDispatch } from "../Context";

import { useNavigate } from "react-router-dom";

// import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function Login() {
  const initialValues = {
    email: "",
    password: "",
    error: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const dispatch = useAuthDispatch();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let payload = formData;
    try {
      let response = await loginUser(dispatch, payload);
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
      <div className="flex min-h-full items-center bg-primary mx-auto mt-5 justify-center content-center py-2 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <h2 className="  text-2xl font-bold tracking-tight text-white">
                  Welcome Back. Login.
                </h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <input
                  type="hidden"
                  name="remember"
                  defaultValue="true"
                />

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

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link
                      to="/register"
                      className="font-medium text-sky-900 hover:text-indigo-500"
                    >
                      Need an account?
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
                    Login
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
