import client from "../../api/client";

export const getAllCollections = async (dispatch) => {
  // dispatch({
  //   type: "LOADING",
  // });
  try {
    const p = await client.get(`/api/v1/Collection/getCollections`);
    console.log("collections", p.data.data);
    dispatch({
      type: "FETCHED_DATA",
      payload: p.data?.data,
    });
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: error.response?.data?.message || "Couldn't get cart",
    });
    console.log("Error Getting Collections", error.response);
  }
};

export const createAdminCollections = async (dispatch, data) => {
  // dispatch({
  //   type: "LOADING",
  // });
  try {
    const p = await client.post(
      `/api/v1/Collection/addCollection?pageSize=10000`,
      data
    );
    getAllCollections(dispatch);
    return true;
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: error.response?.data?.message || "Couldn't get cart",
    });
    alert(error.response?.data?.message);
    console.log("Error Getting Collections", error.response);
  }
};
export const deleteAdminCollections = async (dispatch, data) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const p = (
      await client.delete(`/api/v1/Collection/deleteCollection/${data}`)
    ).data;
    // console.log("cartegory", p);
    getAllCategory(dispatch);
    alert("Collections deleted successfully");
    return true;
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: error.response?.data?.message,
    });
    console.log("Error deleting collection", error.response);
  }
};
