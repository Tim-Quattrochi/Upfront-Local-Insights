import axios from "../hooks/useAxios";
const API_URL = "http://localhost:3001/api";

export async function loginUser(dispatch, loginPayload) {
  try {
    console.log(loginPayload);
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await axios.post(
      `${API_URL}/users/login`,
      JSON.stringify(loginPayload),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(response);

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

export async function registerUser(dispatch, registerPayload) {
  try {
    dispatch({ type: "REQUEST_REGISTER" });
    let response = await axios.post(
      `${API_URL}/users/register`,
      registerPayload
    );

    if (response.error) {
      dispatch({ type: "REGISTER_ERROR", error });
      return null;
    }

    if (response.data.user) {
      dispatch({ type: "REGISTER_SUCCESS", payload: response.user });
      localStorage.setItem(
        "insightUser",
        JSON.stringify(response.data.user)
      );
      return response;
    }

    const error = response.error;
  } catch (error) {
    dispatch({ type: "REGISTER_ERROR", error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("insightUser");
  localStorage.removeItem("accessToken");
}
