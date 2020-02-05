export const getAvailableProducts = state => state.product.availableProducts;

export const getUserProducts = state => state.product.userProducts;

export const getUserProductById = productId => state =>
  getUserProducts(state).find(product => product.id === productId);
