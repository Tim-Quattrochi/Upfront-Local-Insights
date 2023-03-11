import { useState, useEffect } from "react";

const API_URL = "http://localhost:3001/api";

/**
 *
 * @param {string} url - the URL to send the request to.
 * @param {object} options - Options to include in the request.
 * @returns {object} = An object containing the response data and error.
 */

const useAuthFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("No Access token provided.");
        return;
      }
      setIsLoading(true);

      const requestOptions = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      };

      try {
        const response = fetch(`${API_URL}${url}`, requestOptions);

        if (response.status === 401) {
          const accessToken = localStorage.getItem("accessToken");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [url, options]);

  return { response, error, isLoading };
};

export default useAuthFetch;
