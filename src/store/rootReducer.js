import { combineReducers } from "redux";

import product from "./product/reducers";
import cart from "./cart/reducers";

const rootReducer = combineReducers({
  product,
  cart
});

export default rootReducer;
