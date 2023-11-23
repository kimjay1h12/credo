import client from "../../api/client";

export const getAllCustomers = async (dispatch) => {
  // dispatch({
  //   type: "LOADING",
  // });
  try {
    const p = await client.get(`/api/v1/Customer/getCustomers`);
    console.log("Customers", p.data.data);
    dispatch({
      type: "FETCHED_DATA",
      payload: p.data?.data,
    });
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: error.response?.data?.message || "Couldn't get cart",
    });
    console.log("Error Getting Customers", error.response);
  }
};
