import { useReducer } from "react";

let user = localStorage.getItem("insightUser")
  ? JSON.parse(localStorage.getItem("insightUser")).user
  : "";

let accessToken = localStorage.getItem("insightUser")
  ? JSON.parse(localStorage.getItem("insightUser")).access_Token
  : "";

export const initialState = {
  userDetails: "" || user,
  accessToken: "" || accessToken,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        accessToken: "",
      };
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    case "REQUEST_REGISTER":
      return {
        ...initialState,
        loading: true,
      };
    case "REGISTER_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        loading: false,
      };

    case "REGISTER_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
