//create a hook to retrieve all businesses
import { useEffect, useState } from "react";
import axios from "./useAxios";
const useGetBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("business")
      .then((response) => {
        const { businesses } = response.data;

        if (response.status === 200) {
          setBusinesses(businesses);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { businesses, loading, error };
};

export default useGetBusinesses;
