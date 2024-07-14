//create a hook to retrieve all businesses
import { useEffect, useState } from "react";
import axios from "./useAxios";
const useGetBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLongLoad, setIsLongLoad] = useState(false);

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

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setIsLongLoad(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setIsLongLoad(false);
    }
  }, [loading]);

  return { businesses, loading, error, isLongLoad };
};

export default useGetBusinesses;
