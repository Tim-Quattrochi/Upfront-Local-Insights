import React, { useReducer, useState, useEffect } from "react";
import { AuthReducer } from "./reducer";
import { initialState } from "./reducer";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

/**
 * It returns the context value of the AuthStateContext
 * @returns The AuthStateContext
 */
export function useAuthState() {
  const context = React.useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error("useAuthState must be within an AuthProvider");
  }
  return context;
}

/**
 * UseAuthDispatch is a React hook that returns the AuthDispatchContext, which is a function that
 * dispatches actions to the AuthReducer.
 * @returns The AuthDispatchContext is being returned.
 */
export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error(
      "useAuthDispatch must be used within an AuthProvider"
    );
  }
  return context;
}

/**
 * The AuthProvider function is a React component that provides the current user state and a dispatch
 * function to the AuthStateContext and AuthDispatchContext
 * @returns The AuthProvider is returning the AuthStateContext.Provider and the
 * AuthDispatchContext.Provider.
 */
export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={{ user }}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
