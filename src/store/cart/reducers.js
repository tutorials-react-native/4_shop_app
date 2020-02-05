import produce from "immer";
import CartItem from "data/models/cartItem";
import { actions } from "store";

const INITIAL_STATES = {
  items: {},
  totalAmount: 0
};

const cart = produce((draft, action) => {
  switch (action.type) {
    case actions.ADD_TO_CART:
      const { id, title, price } = action.selectedProduct;
      if (draft.items[id]) {
        draft.items[id].quantity++;
        draft.items[id].sum += +price.toFixed(2);
      } else {
        draft.items[id] = new CartItem(1, +price, title, price);
      }

      draft.totalAmount += +price.toFixed(2);
      return;

    case actions.REMOVE_FROM_CART:
      const { key } = action.cartItem;
      const { quantity, productPrice } = draft.items[key];

      if (quantity > 1) {
        draft.items[key].quantity -= 1;
        draft.items[key].sum -= +productPrice.toFixed(2);
      } else {
        delete draft.items[key];
      }
      draft.totalAmount -= +productPrice.toFixed(2);
      return;

    case actions.ADD_ORDER:
      return INITIAL_STATES;

    case actions.DELETE_PRODUCT:
      const { productId } = action;
      if (draft.items[productId]) {
        draft.totalAmount -= draft.items[productId].sum;
        delete draft.items[productId];
      }
      return;
  }

  return;
}, INITIAL_STATES);

export default cart;
