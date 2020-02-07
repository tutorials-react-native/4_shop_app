import produce from "immer";

import { actions } from "store";
import Order from "data/models/order";

const INITIAL_STATES = {
  orders: []
};

const orders = produce((draft, action) => {
  switch (action.type) {
    case actions.ADD_ORDER:
      const { items, totalAmount, date, id } = action;
      const newOrder = new Order(id, items, totalAmount, date);
      draft.orders.push(newOrder);
      break;
  }
  return;
}, INITIAL_STATES);

export default orders;
