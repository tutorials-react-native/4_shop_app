import { baseUrl } from "api";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProduct = () => async dispatch => {
  const response = await fetch(`${baseUrl}product.json`).catch(error => {
    throw error;
  });
  const resData = await response.json();
  const products = resData
    ? Object.keys(resData).map(key => ({
        id: key,
        ...resData[key]
      }))
    : [];
  dispatch(setProduct(products));
};

export const setProduct = products => ({
  type: SET_PRODUCTS,
  products
});

export const deleteProduct = productId => ({
  type: DELETE_PRODUCT,
  productId
});

export const createProduct = ({
  ownerId,
  title,
  imageUrl,
  description,
  price
}) => async dispatch => {
  const response = await fetch(`${baseUrl}product.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ownerId,
      title,
      imageUrl,
      description,
      price
    })
  });
  const resData = await response.json();
  dispatch({
    type: CREATE_PRODUCT,
    product: {
      id: resData.name,
      ownerId,
      title,
      imageUrl,
      description,
      price
    }
  });
};

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
