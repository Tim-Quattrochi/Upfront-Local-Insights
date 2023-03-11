const API_URL = "http://localhost:3001/api";

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(loginPayload),
  };
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await fetch(
      `${API_URL}/users/login`,
      requestOptions
    );
    let data = await response.json();

    if (data.user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      console.log(data);
      localStorage.setItem("insightUser", JSON.stringify(data));
      return data;
    }

    dispatch({ type: "LOGIN_ERROR", error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function registerUser(dispatch, registerPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerPayload),
  };
  try {
    dispatch({ type: "REQUEST_REGISTER" });
    let response = await fetch(
      `${API_URL}/users/register`,
      requestOptions
    );

    console.log(response);
    let data = await response.json();

    console.log(data);

    if (data.error) {
      dispatch({ type: "REGISTER_ERROR", error });
      return null;
    }

    if (data.user) {
      dispatch({ type: "REGISTER_SUCCESS", payload: data });
      localStorage.setItem("insightUser", JSON.stringify(data));
      return data;
    }

    const error = data.error;
  } catch (error) {
    dispatch({ type: "REGISTER_ERROR", error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("insightUser");
  localStorage.removeItem("accessToken");
}
