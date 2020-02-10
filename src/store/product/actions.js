import { productApi } from "api";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProduct = () => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await productApi.getProducts();
  const resData = response.data;
  const products = resData
    ? Object.keys(resData).map(key => ({
        id: key,
        ...resData[key]
      }))
    : [];
  dispatch(setProduct({ products, userId }));
};

export const setProduct = ({ products, userId }) => ({
  type: SET_PRODUCTS,
  products,
  userId
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
  title,
  imageUrl,
  description,
  price
}) => async (dispatch, getState) => {
  const { token, userId } = getState().auth;
  const createBody = { ownerId: userId, title, imageUrl, description, price };
  const response = await productApi.createProduct({
    createBody,
    token
  });
  const resData = response.data;
  dispatch({
    type: CREATE_PRODUCT,
    product: {
      id: resData.name,
      ...createBody
    }
  });
};

export const updateProduct = ({ id, title, imageUrl, description }) => async (
  dispatch,
  getState
) => {
  const { token, userId } = getState().auth;
  const updateBody = { id, ownerId: userId, title, imageUrl, description };
  await productApi.updateProduct({
    updateBody,
    token
  });

  dispatch({
    type: UPDATE_PRODUCT,
    product: {
      ...updateBody
    }
  });
};
