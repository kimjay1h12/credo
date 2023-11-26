import client from "../../api/client";
import { getCart } from "./cart";

export const signupHandler = async (data, dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const res = await client.post("/api/v1/Auth/register", data);
    // console.log("signup", res.data.data?.user);
    localStorage.setItem("nd-rest-tkn", res.data.data?.authToken);
    localStorage.setItem("userData", JSON.stringify(res.data.data?.user));
    // localStorage.removeItem("setupStore");
    client.defaults.headers.post["Content-Type"] = "application/json";
    client.defaults.headers.Authorization = `Bearer ${res.data.data?.authToken}`;
    dispatch({
      type: "SUCCESS",
      payload: res.data.data,
    });

    return true;
  } catch (error) {
    console.log("Error", error.response.data);
    alert(error?.response?.data?.message);
    dispatch({
      type: "ERROR",
      payload: error?.response?.data?.message,
    });

    return false;
  }
};

export const resendOtp = async (data, dispatch) => {
  // return alert(data.otp, data.email);
  console.log("data", data);
  dispatch({
    type: "LOADING",
  });
  try {
    const res = await client.post("business/resendOTPEmailVerification", data);

    return true;
  } catch (error) {
    console.log("Error", error.response);
    alert(error?.response?.data?.message);

    dispatch({
      type: "ERROR",
      payload: error?.response?.data?.message,
    });

    return false;
  }
};
export const forgottenpassword = async (data, dispatch) => {
  // return alert(data.otp, data.email);
  // console.log("data", data);
  dispatch({
    type: "LOADING",
  });
  try {
    const res = await client.post("/api/v1/Auth/forgotPassword/", data);
    console.log("forgotten password", res);
    return true;
  } catch (error) {
    console.log("Error", error.response);
    alert(error?.response?.data?.message);
    dispatch({
      type: "ERROR",
      payload: error?.response?.data?.message,
    });

    return false;
  }
};
export const resendPassword = async (data, dispatch) => {
  // return alert(data.otp, data.email);
  // console.log("data", data);
  dispatch({
    type: "LOADING",
  });
  try {
    const res = await client.post("/api/v1/Auth/resetPassword", data);

    return true;
  } catch (error) {
    console.log("Error", error.response);
    dispatch({
      type: "ERROR",
      payload: error?.response?.data?.message,
    });

    return false;
  }
};
export const verifyOTP = async (data, dispatch) => {
  // return alert(data.otp, data.email);
  console.log("data", data);
  dispatch({
    type: "LOADING",
  });
  try {
    const res = await client.post(
      "/api/v1/Auth/verifyOtpCodePasswordReset",
      data
    );
    // localStorage.setItem("nd-rest-tkn", res.data.data?.authToken);
    // client.defaults.headers.post["Content-Type"] = "application/json";
    // client.defaults.headers.Authorization = `Bearer ${res.data.data?.authToken}`;
    // console.log("success", res.data);
    // dispatch({
    //   type: "SUCCESS",
    //   payload: res.data.data,
    // });
    return true;
  } catch (error) {
    console.log("Error", error.response);
    dispatch({
      type: "ERROR",
      payload: error?.response?.data?.message,
    });

    return false;
  }
};

export const signInHandler = async (data, dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const res = await client.post("/api/v1/Auth/login", data);

    localStorage.setItem("nd-rest-tkn", res.data.data?.authToken);
    localStorage.setItem("userData", JSON.stringify(res.data.data?.user));
    // localStorage.removeItem("setupStore");
    client.defaults.headers.post["Content-Type"] = "application/json";
    client.defaults.headers.Authorization = `Bearer ${res.data.data?.authToken}`;
    dispatch({
      type: "SUCCESS",
      payload: res.data.data,
    });
    getCurrentUser(dispatch);
    return true;
  } catch (error) {
    alert(error?.response?.data?.message);

    console.log("Error", error.response);

    dispatch({
      type: "ERROR",
      payload: error?.response?.data?.message,
    });
    return false;
  }
};

export const setupPin = async (data, dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const res = await client.post("business/setupPin", data);

    // localStorage.setItem("nd-rest-tkn", res.data.data?.authToken);
    // localStorage.setItem("userData", JSON.stringify(res.data.data));
    // dispatch({
    //   type: "SUCCESS",
    //   payload: res.data.data,
    // });
    // getCurrentUser(dispatch);
    return true;
  } catch (error) {
    console.log("Error", error.response);
    dispatch({
      type: "ERROR",
      payload: error?.response?.data?.message,
    });
    return false;
  }
};

export const logoutHandler = (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
  localStorage.clear();

  return true;
};

export const getCurrentUser = async (dispatch) => {
  const user = localStorage.getItem("userData");
  const authToken = localStorage.getItem("nd-rest-tkn");
  // const stored_setup_data = localStorage.getItem("setup_data");
  client.defaults.headers.post["Content-Type"] = "application/json";
  client.defaults.headers.Authorization = `Bearer ${authToken}`;
  console.log("user", user);
  if (user) {
    dispatch({
      type: "SUCCESS",
      payload: JSON.parse(user),
    });
    console.log("setupid", JSON.parse(user).id);
    try {
      const res = await client.get(`/api/v1/Auth/getUser`);
      console.log("setupdata", res);
      // localStorage.setItem("nd-rest-tkn", res.data.data?.authToken);
      localStorage.setItem("userData", JSON.stringify(res.data.data));
      // // localStorage.removeItem("setupStore");
      // client.defaults.headers.post["Content-Type"] = "application/json";
      // client.defaults.headers.Authorization = `Bearer ${res.data.data?.authToken}`;
      const payload = {
        user: res.data.data,
        authToken: authToken,
      };
      console.log("userdata", payload);
      dispatch({
        type: "SUCCESS",
        payload: payload,
      });
    } catch (error) {
      logoutHandler(dispatch);
      console.log("Couldn't get user", error);
    }
  } else logoutHandler(dispatch);
};
