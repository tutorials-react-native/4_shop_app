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
        draft.items[id].sum += price;
      } else {
        draft.items[id] = new CartItem(1, price, title, price);
      }

      draft.totalAmount += price;
      break;
  }

  return;
}, INITIAL_STATES);

export default cart;
