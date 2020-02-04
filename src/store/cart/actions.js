export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = selectedProduct => ({
  type: ADD_TO_CART,
  selectedProduct
});
