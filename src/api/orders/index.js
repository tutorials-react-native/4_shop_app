import { firebaseClient } from "../client";

export const api = {
  createOrder: async ({ items, totalAmount, token, userId }) => {
    return await firebaseClient
      .post(
        `orders/${userId}.json?auth=${token}`,
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

  getOrders: async userId => {
    return await firebaseClient.get(`orders/${userId}.json`).catch(error => {
      throw error;
    });
  }
};
