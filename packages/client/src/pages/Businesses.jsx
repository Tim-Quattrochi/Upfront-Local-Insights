import { useEffect, useState } from "react";
import ListBusiness from "../components/ListBusiness";
import useFetchPrivate from "../hooks/useFetchPrivate";

const Businesses = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchPrivate = useFetchPrivate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchPrivate("business", {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        setData(data.Businesses);
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
