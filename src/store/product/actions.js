export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = productId => ({
  type: DELETE_PRODUCT,
  productId
});

export const createProduct = ({
  id,
  ownerId,
  title,
  imageUrl,
  description,
  price
}) => ({
  type: CREATE_PRODUCT,
  product: {
    id,
    ownerId,
    title,
    imageUrl,
    description,
    price
  }
});

export const updateProduct = ({
  id,
  ownerId,
  title,
  imageUrl,
  description
}) => ({
  type: UPDATE_PRODUCT,
  product: {
    id,
    ownerId,
    title,
    imageUrl,
    description
  }
});
