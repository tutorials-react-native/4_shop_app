import PRODUCTS from "data/dummy-data";
import produce from "immer";

const INITIAL_STATE = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === "u1")
};

const product = produce((draft, action) => {
  return;
}, INITIAL_STATE);

export default product;
