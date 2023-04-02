import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import Landing from "./components/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuthState } from "./Context";
import SubmitBusiness from "./pages/SubmitBusiness";
import ViewSingleBusiness from "./components/ViewSingleBusiness";
import ErrorPage from "./components/RouteError";
import LeaveRating from "./components/LeaveRating";
import ListBusiness from "./components/ListBusiness";

function App() {
  const { isLoggedIn } = useAuthState();
  console.log(isLoggedIn);

  return (
    <ErrorBoundary>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Landing />}
          errorElement={<ErrorPage />}
        />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="businesses" element={<ListBusiness />} />

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
    </ErrorBoundary>
  );
}

export default App;
