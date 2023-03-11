import { useAuthDispatch, useAuthState } from "../Context";

const useRefreshToken = () => {
  const dispatch = useAuthDispatch();

  const refresh = async () => {
    const response = await fetch.get("api/auth/refresh", {
      //send with cookies
      withCredentials: true,
    });

    dispatch({
      type: "REFRESH_ACCESS_TOKEN",
      payload: { accessToken: response.data.accessToken },
    });
    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;
