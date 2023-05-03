import { useState, useEffect } from "react";
import { useAuthState } from "../Context";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import SelfReviews from "../components/SelfReviews";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const ProfilePage = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [error, setError] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthState();

  const axios = useAxiosPrivate();

  useEffect(() => {
    axios
      .get(`/review/${user.user._id}`)
      .then((res) => {
        setUserReviews(res.data.ownedReviews.reviews);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.error);
        setShowErrorToast(true);
      });
  }, []);

  return (
    <div className="prose min-h-screen mx-auto">
      {showErrorToast && (
        <Toast
          position="toast-end toast-middle"
          appearance="alert-error"
          error="true"
          errorMsg="You must be logged in."
          onHide={() => setShowErrorToast(false)}
        />
      )}

      <h1 className="text-center text-cyan-500 py-5">
        {error ? "Hi Guest, please login." : "My Reviews"}
      </h1>
      <SelfReviews userReviews={userReviews} />
      <Link to={error ? "/login" : "/businesses"}>
        <button className="btn mx-auto">
          {error ? "Go to Login" : "Back to listings"}
        </button>
      </Link>
    </div>
  );
};

export default ProfilePage;
