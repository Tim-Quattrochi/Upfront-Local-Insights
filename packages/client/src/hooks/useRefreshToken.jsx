import { useAuthDispatch, useAuthState } from "../Context";
import axios from "./useAxios";
import { useEffect } from "react";

const useRefreshToken = () => {
  const dispatch = useAuthDispatch();
  const { accessToken } = useAuthState();

  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });

    const newAccessToken = response.data.accessToken;
    dispatch({
      type: "REFRESH_ACCESS_TOKEN",
      payload: { accessToken: newAccessToken },
    });
    return newAccessToken;
  };

  return refresh;
};

export default useRefreshToken;
