import { firebaseClient } from "../client";

export const api = {
  createOrder: async ({ items, totalAmount, token }) => {
    return await firebaseClient
      .post(
        `orders/u1.json?auth=${token}`,
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
  },

  getOrders: async () => {
    return await firebaseClient.get("orders/u1.json").catch(error => {
      throw error;
    });
  }
};
