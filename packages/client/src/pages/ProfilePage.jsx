import { useState, useEffect } from "react";
import { useAuthState } from "../Context";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import SelfReviews from "../components/SelfReviews";

const ProfilePage = () => {
  const [userReviews, setUserReviews] = useState([]);
  const { user } = useAuthState();
  const axios = useAxiosPrivate();

  console.log(user.user._id);

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

  return <SelfReviews userReviews={userReviews} />;
};

export default ProfilePage;
