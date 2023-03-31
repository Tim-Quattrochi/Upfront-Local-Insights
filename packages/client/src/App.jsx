import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Footer } from "./components/Footer";
import Businesses from "./pages/Businesses";
import { Navbar } from "./components/Navbar";
import Landing from "./components/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuthState } from "./Context";
import SubmitBusiness from "./pages/SubmitBusiness";
import ViewSingleBusiness from "./components/ViewSingleBusiness";
import ErrorPage from "./components/RouteError";
import LeaveRating from "./components/LeaveRating";

function App() {
  const { isLoggedIn } = useAuthState();
  console.log(isLoggedIn);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Landing />}
          errorElement={<ErrorPage />}
        />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="businesses" element={<Businesses />} />

        <Route
          path="businesses/:businessId"
          element={<ViewSingleBusiness />}
        />
        <Route
          path="businesses/leave-rating"
          element={<LeaveRating />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
