import { Route, Routes } from "react-router-dom";
import bgImage from "./assets/bgImage.svg";
import ErrorBoundary from "./components/ErrorBoundary";
import { Navbar } from "./components/Navbar";
import Landing from "./components/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ViewSingleBusiness from "./components/ViewSingleBusiness";
import ErrorPage from "./components/RouteError";
import LeaveRating from "./components/LeaveRating";
import ListBusiness from "./components/ListBusiness";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="bg-[bgImage] bg-cover bg-center h-full w-full fixed top-0 left-0 ">
      <ErrorBoundary>
        <Navbar />
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
    </div>
  );
}

export default App;
