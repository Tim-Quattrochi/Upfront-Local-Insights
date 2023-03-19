import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../hooks/useAxios";

const ViewSingleBusiness = (props) => {
  const [singleBusiness, setSingleBusiness] = useState(null);

  const { businessId } = useParams();

  console.log(businessId);

  useEffect(() => {
    const getSingleBusiness = async () => {
      const response = await axios
        .get(`business/${businessId}`)
        .then((data) => {
          console.log(data);
          setSingleBusiness(data.data.business);
        })
        .catch((err) => console.log(err));
    };

    getSingleBusiness();
    return () => {
      console.log("unmounted");
    };
  }, [businessId]);

  return (
    <div>Business Name: {singleBusiness && singleBusiness.name}</div>
  );
};

export default ViewSingleBusiness;
