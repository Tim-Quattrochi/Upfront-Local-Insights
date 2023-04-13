import axios from "../hooks/useAxios";
import { baseURl } from "../../config/constants";

const API_URL = baseURl;

/**
 * It takes in a dispatch function and a loginPayload object, and then it makes a post request to the
 * backend, and if the response is successful, it dispatches a login success action, and if the
 * response is unsuccessful, it dispatches a login error action
 * @returns The response from the server.
 */
export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await axios.post(
      `/users/login`,
      JSON.stringify(loginPayload),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.data.user) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data,
      });

      localStorage.setItem(
        "insightUser",
        JSON.stringify(response.data)
      );
      return response;
    }

    dispatch({ type: "LOGIN_ERROR", error: response.data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

/**
 * It takes in a dispatch function and a register payload, and then dispatches a request register
 * action, makes a post request to the register endpoint, and then dispatches a register success action
 * if the response is successful, or a register error action if the response is not successful
 * @returns The response from the server.
 */
export async function registerUser(dispatch, registerPayload) {
  console.log(dispatch);
  console.log(registerPayload);
  try {
    dispatch({ type: "REQUEST_REGISTER" });
    let response = await axios.post(
      `${API_URL}/users/register`,
      registerPayload
    );

    console.log(response);

    if (response.data?.error) {
      dispatch({ type: "REGISTER_ERROR", error });
      console.log(response.error);
      return error;
    }

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: response.data,
    });
    localStorage.setItem(
      "insightUser",
      JSON.stringify(response.data.user)
    );

    /* Logging in the user after they have registered. */
    await loginUser(dispatch, {
      email: registerPayload.email,
      password: registerPayload.password,
    });

    return response;
  } catch (error) {
    error = error.response.data.error;
    console.log(error);
    dispatch({ type: "REGISTER_ERROR", error });
  }
}

/**
 * It takes a dispatch function as an argument, and then dispatches an action to the reducer, and then
 * removes the user and access token from local storage
 */
export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("insightUser");
  localStorage.removeItem("accessToken");
}
