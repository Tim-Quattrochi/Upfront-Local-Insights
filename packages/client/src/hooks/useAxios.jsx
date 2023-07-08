import axios from "axios";
import { baseURl } from "../../config/constants";

export default axios.create({
  baseURL: baseURl,
});

export const axiosPrivate = axios.create({
  baseURL: baseURl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
