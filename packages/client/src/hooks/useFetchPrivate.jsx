import useRefreshToken from "./useRefreshToken";
import { useEffect, useState } from "react";
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
    const handleResponse = async (response, retryCount = 0) => {
      if (response.status === 403) {
        const prevRequest = response.clone().request;

        if (prevRequest && !prevRequest.sent) {
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
          const fetchResponse = await fetch(updatedRequest);
          return handleResponse(fetchResponse);
        }
        await refresh(); // retrieve a new access token
        throw new Error("Forbidden");
      } else if (response.status >= 200 && response.status < 300) {
        return response;
      } else if (
        response.status === 403 &&
        response.statusText === "Forbidden" &&
        retryCount === 0
      ) {
        await refresh();
        const retryRequest = await requestIntercept(
          `${API_URL}/${url}`,
          options
        );
        const fetchResponse = await fetch(retryRequest);
        return handleResponse(fetchResponse, retryCount + 1);
      } else {
        throw new Error(response.statusText);
      }
    };

    const fetchPrivate = async (url, options) => {
      const request = await requestIntercept(
        `${API_URL}/${url}`,
        options
      );
      const fetchResponse = await fetch(request);
      const response = await handleResponse(fetchResponse);
      return response;
    };

    window.fetchPrivate = fetchPrivate;
    return () => {
      delete window.fetchPrivate;
    };
  }, [auth, refresh]);

  return (url, options) => window.fetchPrivate(url, options);
};

export default useFetchPrivate;
