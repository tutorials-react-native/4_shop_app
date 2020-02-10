import { productApi } from "api";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProduct = () => async dispatch => {
  const response = await productApi.getProducts();
  const resData = response.data;
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

export const deleteProduct = productId => async (dispatch, getState) => {
  const token = getState().auth.token;
  await productApi.deleteProduct({ productId, token });
  dispatch({
    type: DELETE_PRODUCT,
    productId,
    token
  });
};

export const createProduct = ({
  ownerId,
  title,
  imageUrl,
  description,
  price
}) => async (dispatch, getState) => {
  const token = getState().auth.token;
  const response = await productApi.createProduct({
    createBody: { ownerId, title, imageUrl, description, price },
    token
  });
  const resData = response.data;
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
}) => async (dispatch, getState) => {
  const token = getState().auth.token;
  await productApi.updateProduct({
    updateBody: { id, ownerId, title, imageUrl, description },
    token
  });

  dispatch({
    type: UPDATE_PRODUCT,
    product: {
      id,
      ownerId,
      title,
      imageUrl,
      description
    }
  });
};
