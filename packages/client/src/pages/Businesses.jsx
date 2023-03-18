import { useEffect, useState } from "react";
import ListBusiness from "../components/ListBusiness";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Businesses = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const axios = useAxiosPrivate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("business");

        console.log(response);
        setData(response.data.businesses);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ListBusiness businesses={data} />
      )}
    </div>
  );
};

export default Businesses;
