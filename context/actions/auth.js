import client from "../../api/client";

export const signupHandler = async (data, dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const res = await client.post("business/signup", data);

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
    const res = await client.post("business/businessOtpVerification", data);
    localStorage.setItem("nd-rest-tkn", res.data.data?.token);
    client.defaults.headers.post["Content-Type"] = "application/json";
    client.defaults.headers.Authorization = `Bearer ${res.data.data?.token}`;
    console.log("success", res.data);
    dispatch({
      type: "SUCCESS",
      payload: res.data.data,
    });
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
    const res = await client.post("business/emailLogin", data);

    localStorage.setItem("nd-rest-tkn", res.data.data?.token);
    localStorage.setItem("userData", JSON.stringify(res.data.data));
    localStorage.removeItem("setupStore");
    client.defaults.headers.post["Content-Type"] = "application/json";
    client.defaults.headers.Authorization = `Bearer ${res.data.data?.token}`;
    dispatch({
      type: "SUCCESS",
      payload: res.data.data,
    });
    getCurrentUser(dispatch);
    return true;
  } catch (error) {
    console.log("Error", error.response);
    if (error.response?.data?.message === "Email not verified") {
      return "unverified";
    } else {
      dispatch({
        type: "ERROR",
        payload: error?.response?.data?.message,
      });
      return false;
    }
  }
};

export const setupPin = async (data, dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const res = await client.post("business/setupPin", data);

    // localStorage.setItem("nd-rest-tkn", res.data.data?.token);
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
};

export const getRestauantDetails = async (id, dispatch) => {
  return client.get(`business/businessDetails?business_id=${id}`);
};

export const getCurrentUser = async (dispatch) => {
  const user = localStorage.getItem("userData");
  const stored_setup_data = localStorage.getItem("setup_data");
  if (stored_setup_data)
    dispatch({
      type: "SETUP_DATA",
      payload: JSON.parse(stored_setup_data),
    });

  if (user) {
    dispatch({
      type: "SUCCESS",
      payload: JSON.parse(user),
    });
    console.log("setupid", JSON.parse(user).id);
    try {
      const setup_data = (
        await client.get(
          `/business/businessDetails?business_id=${JSON.parse(user).id}`
        )
      ).data?.data;
      console.log("setupdata", setup_data);
      dispatch({
        type: "SETUP_DATA",
        payload: setup_data,
      });
      localStorage.setItem("setup_data", JSON.stringify(setup_data));
    } catch (error) {
      logoutHandler(dispatch);
      console.log("Couldn't get user", error);
    }
  } else logoutHandler(dispatch);
};
