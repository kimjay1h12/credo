import client from "../../api/client";
export const UpdateOrderPayment = async (id, data) => {
  try {
    const p = (await client.post(`/api/v1/Order/updateOrder/${id}`, data)).data;

    alert("Order added successfully");
    return true;
  } catch (error) {
    console.log("Error creating products", error.response || error);
    return false;
  }
};
export const GetPaymentInfo = async (dispatch) => {
  try {
    const p = (await client.get("/api/v1/PaymentInfo/getPaymentInfo")).data;
    console.log(p, "payment");
    dispatch({
      type: "FETCHED_DATA",
      payload: p.data,
    });
    // alert("Order added successfully");
    // return true;
  } catch (error) {
    console.log("Error getting payment info", error.response || error);
    return false;
  }
};
export const UpdateOrderCheckoutPayment = async (data) => {
  try {
    const p = (await client.post(`/api/v1/Order/updateCheckout`, data)).data;

    alert("Order added successfully");
    return true;
  } catch (error) {
    console.log("Error creating products", error.response || error);
    return false;
  }
};
