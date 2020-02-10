import { combineReducers } from "redux";

import product from "./product/reducers";
import cart from "./cart/reducers";
import orders from "./orders/reducers";
import auth from "./auth/reducers";

const rootReducer = combineReducers({
  product,
  cart,
  orders,
  auth
});

export default rootReducer;
