import { useReducer } from "react";

let user = localStorage.getItem("insightUser")
  ? JSON.parse(localStorage.getItem("insightUser")).user
  : "";

let accessToken = localStorage.getItem("insightUser")
  ? JSON.parse(localStorage.getItem("insightUser")).accessToken
  : "";

//is there an insightUser in local storage? have logged in be true.
//We may need to refactor this if the auth flow gets more complex.

export const initialState = {
  user: "" || user,
  accessToken: "" || accessToken,
  loading: false,
  isLoggedIn: user ? true : false, //is there a user in localStorage?
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  console.log(action.payload);
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
        accessToken: action.payload.user.accessToken,
        loading: false,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        accessToken: "",
        isLoggedIn: false,
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

    case "CHECK_AUTH_STATUS":
      return initialState;

    case "REFRESH_ACCESS_TOKEN":
      return {
        ...initialState,
        accessToken: action.payload.accessToken,
        loading: true,
      };

    case "REFRESH_ACCESS_TOKEN_SUCCESS":
      return {
        ...initialState,
        loading: false,
      };

    case "REFRESH_ACCESS_TOKEN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
