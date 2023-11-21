import client from "../../api/client";

export const getCart = async (dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const p = (await client.get(`/cart`)).data;
    dispatch({
      type: "FETCHED_DATA",
      payload: p.data,
    });
    console.log(p.data);
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: error.response?.data?.message || "Couldn't get cart",
    });
    console.log("Error Getting Cart", error.response);
  }
};
