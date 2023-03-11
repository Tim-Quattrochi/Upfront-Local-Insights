import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";
import { useAuthState } from "../Context";

const API_URL = "http://localhost:3001/api";

const useFetchPrivate = () => {
  const refresh = useRefreshToken();
  const auth = useAuthState();

  const requestIntercept = async (url, options) => {
    const request = new Request(url, options);

    const headers = new Headers(request.headers);

    if (auth && auth.accessToken) {
      headers.set("Authorization", `Bearer ${auth.accessToken}`);
    }

    const updatedOptions = {
      ...options,
      headers,
    };

    return new Request(url, updatedOptions);
  };

  useEffect(() => {
    const handleResponse = async (response) => {
      if (response.status === 403) {
        const prevRequest = response.clone().request;
        if (!prevRequest.sent) {
          prevRequest.sent = true;
          const newToken = await refresh();
          prevRequest.headers.set(
            "Authorization",
            `Bearer ${newToken}`
          );
          const updatedRequest = await requestIntercept(
            prevRequest.url,
            prevRequest
          );
          return fetch(updatedRequest);
        }
      }
      return response;
    };

    const fetchPrivate = async (url, options) => {
      const request = await requestIntercept(
        `${API_URL}/${url}`,
        options
      );
      const fetchResponse = await fetch(request);
      return handleResponse(fetchResponse);
    };

    window.fetchPrivate = fetchPrivate;
    return () => {
      delete window.fetchPrivate;
    };
  }, [auth, refresh]);

  return (url, options) => window.fetchPrivate(url, options);
};

export default useFetchPrivate;
