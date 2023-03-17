import { useAuthDispatch, useAuthState } from "../Context";
import { useEffect } from "react";

const useRefreshToken = () => {
  const dispatch = useAuthDispatch();
  const { accessToken } = useAuthState();

  const refresh = async () => {
    const options = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(
      "http://localhost:3001/api/auth/refresh",
      options
    );
    const data = await response.json();

    console.log(data);
    const newAccessToken = data.accessToken;
    dispatch({
      type: "REFRESH_ACCESS_TOKEN",
      payload: { accessToken: newAccessToken },
    });
    return newAccessToken;
  };

  useEffect(() => {
    if (!accessToken) {
      refresh();
    }
  }, []);

  return refresh;
};

export default useRefreshToken;
