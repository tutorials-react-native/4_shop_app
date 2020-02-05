export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addToCart = selectedProduct => ({
  type: ADD_TO_CART,
  selectedProduct
});

export const removeFromCart = cartItem => ({
  type: REMOVE_FROM_CART,
  cartItem
});
