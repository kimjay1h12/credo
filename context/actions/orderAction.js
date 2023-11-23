import client from "../../api/client";

export const getAllOrders = async (dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const p = (await client.get(`/api/v1/Order/getOrders?pageSize=10000`)).data;
    dispatch({
      type: "FETCHED_DATA",
      payload: p.data,
    });
    // console.log("products", p.data);
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: error.response?.data?.message || "Couldn't get cart",
    });
    console.log("Error all orders", error.response);
  }
};
