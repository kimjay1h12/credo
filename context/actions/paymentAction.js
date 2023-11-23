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
