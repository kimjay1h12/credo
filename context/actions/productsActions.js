import client from "../../api/client";

export const getAllUserProducts = async (dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const p = (
      await client.get(`/api/v1/Product/getAllProducts?pageSize=10000`)
    ).data;
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
    console.log("Error all products", error.response);
  }
};
export const getAllAdminProducts = async (dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const p = (await client.get(`/api/v1/Product/getUserProducts`)).data;
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
    console.log("Error all admin products", error.response);
  }
};
export const createAdminProducts = async (dispatch, data) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const p = (await client.post(`/api/v1/Product/addProduct`, data)).data;
    getAllAdminProducts(dispatch);
    // console.log("products", p);
    alert("Product Created Successfully");
    return true;
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: error.response?.data?.message || "Couldn't get cart",
    });
    console.log("Error creating products", error.response || error);
    return false;
  }
};
export const deleteAdminProducts = async (dispatch, data) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const p = (await client.delete(`/api/v1/Product/deleteProduct/${data}`))
      .data;
    // console.log("cartegory", p);
    getAllUserProducts(dispatch);
    alert("Products deleted successfully");
    return true;
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: error.response?.data?.message,
    });
    console.log("Error deleting collection", error.response);
  }
};
