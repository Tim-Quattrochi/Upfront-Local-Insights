import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import React from "react";
import { useAuthState } from "../Context";

const ProtectedRoute = () => {
  const state = useAuthState();
  const navigate = useNavigate();

  const isLoggedIn = state.user?.isLoggedIn;

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/businesses");
    }
  }, [isLoggedIn]);

  return isLoggedIn ? null : <Outlet />;
};

export default ProtectedRoute;
