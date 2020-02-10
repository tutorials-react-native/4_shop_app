import PRODUCTS from "data/dummy-data";
import produce from "immer";
import Product from "data/models/product";

import { actions } from "store";

const INITIAL_STATE = {
  availableProducts: [],
  userProducts: []
};

const product = produce((draft, action) => {
  switch (action.type) {
    case actions.SET_PRODUCTS: {
      const { products, userId } = action;
      draft.availableProducts = products;
      draft.userProducts = products.filter(
        product => product.ownerId === userId
      );
      return;
    }
    case actions.DELETE_PRODUCT: {
      const { productId } = action;
      return {
        availableProducts: draft.availableProducts.filter(
          product => product.id !== productId
        ),
        userProducts: draft.userProducts.filter(
          product => product.id !== productId
        )
      };
    }
    case actions.CREATE_PRODUCT: {
      const {
        id,
        ownerId,
        title,
        imageUrl,
        description,
        price
      } = action.product;
      const newProduct = new Product(
        id,
        ownerId,
        title,
        imageUrl,
        description,
        price
      );
      draft.availableProducts.push(newProduct);
      draft.userProducts.push(newProduct);
      return;
    }

    case actions.UPDATE_PRODUCT: {
      const newAvailableProducts = draft.availableProducts.map(product => {
        if (product.id === action.product.id) {
          return {
            ...action.product,
            price: product.price
          };
        } else {
          return product;
        }
      });
      const newUserProducts = draft.userProducts.map(product => {
        if (product.id === action.product.id) {
          return {
            ...action.product,
            price: product.price
          };
        } else {
          return product;
        }
      });
      return {
        availableProducts: newAvailableProducts,
        userProducts: newUserProducts
      };
    }
  }
  return;
}, INITIAL_STATE);

export default product;
