import { useState, useEffect } from "react";
import { useAuthState } from "../Context";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import SelfReviews from "../components/SelfReviews";

const ProfilePage = () => {
  const [userReviews, setUserReviews] = useState([]);
  const { user } = useAuthState();
  const axios = useAxiosPrivate();

  useEffect(() => {
    async function getSelfReviews() {
      try {
        const response = await axios.get(`/review/${user.user._id}`);
        setUserReviews(response.data.ownedReviews.reviews);
      } catch (error) {
        console.log(error);
      }
    }

    getSelfReviews();
  }, []);

  return (
    <div className="prose min-h-screen mx-auto">
      <h1 className="text-center py-5">My Reviews</h1>
      <SelfReviews userReviews={userReviews} />
    </div>
  );
};

export default ProfilePage;
