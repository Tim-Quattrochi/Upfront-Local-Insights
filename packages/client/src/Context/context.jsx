import React, { useReducer, useState, useEffect } from "react";
import { AuthReducer } from "./reducer";
import { initialState } from "./reducer";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

export function useAuthState() {
  const context = React.useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error("useAuthState must be within an AuthProvider");
  }
  return context;
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error(
      "useAuthDispatch must be used within an AuthProvider"
    );
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);
  const [token, setToken] = useState(initialState.accessToken); //accessToken
  const [loggedInUser, setLoggedInUser] = useState(initialState.user);

  useEffect(() => {
    let user = localStorage.getItem("insightUser")
      ? JSON.parse(localStorage.getItem("insightUser")).user
      : "";

    let accessToken = localStorage.getItem("insightUser")
      ? JSON.parse(localStorage.getItem("insightUser")).accessToken
      : "";

    setToken(accessToken);
  }, []);

  return (
    <AuthStateContext.Provider value={{ user, token, loggedInUser }}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
