import { firebaseClient } from "../client";

export const api = {
  getProducts: async () => {
    return await firebaseClient.get("products.json").catch(error => {
      throw error;
    });
  },

  createProduct: async createProductInfo => {
    return await firebaseClient
      .post(
        "products.json",
        {
          ...createProductInfo
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      .catch(error => {
        throw error;
      });
  },

  updateProduct: async updateProductInfo => {
    const patchBody = {
      ownerId: updateProductInfo.ownerId,
      title: updateProductInfo.title,
      imageUrl: updateProductInfo.imageUrl,
      description: updateProductInfo.description
    };
    return await firebaseClient
      .patch(
        `products/${updateProductInfo.id}.json`,
        {
          ...patchBody
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      .catch(error => {
        throw error;
      });
  },
  deleteProduct: async productId => {
    return await firebaseClient
      .delete(`products/${productId}.json`)
      .catch(error => {
        throw error;
      });
  }
};
