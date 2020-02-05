import { combineReducers } from "redux";

import product from "./product/reducers";
import cart from "./cart/reducers";
import orders from "./orders/reducers";

const rootReducer = combineReducers({
  product,
  cart,
  orders
});

export default rootReducer;
