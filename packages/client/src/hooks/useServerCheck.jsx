import axios from "./useAxios";
import { useState, useEffect } from "react";

const useServerCheck = (url = "/health") => {
  const [serverStatus, setServerStatus] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const checkServer = async () => {
      try {
        await axios.get(url, {
          timeout: 180000, // 3 minutes
          signal: controller.signal,
        });
        setServerStatus(true);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setServerStatus(false);
        }
      }
    };

    checkServer();

    return () => {
      controller.abort();
    };
  }, [url]);

  return serverStatus;
};

export default useServerCheck;
