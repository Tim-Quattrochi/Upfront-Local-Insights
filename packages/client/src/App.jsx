import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Landing from "./components/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ViewSingleBusiness from "./components/ViewSingleBusiness";
import ErrorPage from "./components/RouteError";
import LeaveRating from "./components/LeaveRating";
import ListBusiness from "./components/ListBusiness";
import ProfilePage from "./pages/ProfilePage";
import { inject } from "@vercel/analytics";

function App() {
  return (
    <ErrorBoundary>
      {inject()}

      <Routes>
        <Route
          path="/"
          element={<Landing />}
          errorElement={<ErrorPage />}
        />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="businesses" element={<ListBusiness />} />

        <Route
          path="businesses/:businessId"
          element={<ViewSingleBusiness />}
        />
        <Route
          path="businesses/leave-rating"
          element={<LeaveRating />}
        />

        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
