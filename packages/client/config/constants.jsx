export const CLIENT_NODE_ENV = import.meta.env.VITE_NODE_ENV;
export const baseURl =
  import.meta.env.VITE_API || "http://localhost:3001/api";
export const imagePath =
  CLIENT_NODE_ENV === "production"
    ? import.meta.env.VITE_IMAGE_PATH
    : "http://localhost:3001/";
