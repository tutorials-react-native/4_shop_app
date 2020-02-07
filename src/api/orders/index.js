import { firebaseClient } from "../client";

export const api = {
  createOrder: async (items, totalAmount) => {
    console.log("here");
    return await firebaseClient
      .post(
        "orders/u1.json",
        {
          items,
          totalAmount,
          date: new Date().toISOString()
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      .catch(error => {
        throw error;
      });
  }
};
