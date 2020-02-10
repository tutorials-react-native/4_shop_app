import { firebaseClient } from "../client";

export const api = {
  getProducts: async () => {
    return await firebaseClient.get("products.json").catch(error => {
      throw error;
    });
  },

  createProduct: async ({ createBody, token }) => {
    return await firebaseClient
      .post(
        `products.json?auth=${token}`,
        {
          ...createBody
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      .catch(error => {
        throw error;
      });
  },

  updateProduct: async ({ updateBody, token }) => {
    return await firebaseClient
      .patch(
        `products/${updateBody.id}.json?auth=${token}`,
        {
          ...updateBody
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      .catch(error => {
        throw error;
      });
  },
  deleteProduct: async ({ productId, token }) => {
    return await firebaseClient
      .delete(`products/${productId}.json?auth=${token}`)
      .catch(error => {
        throw error;
      });
  }
};
