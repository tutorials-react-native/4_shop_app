import { orderApi } from "api";

export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (items, totalAmount) => async dispatch => {
  const response = await orderApi.createOrder(items, totalAmount);
  const resData = response.data;
  dispatch({
    type: ADD_ORDER,
    id: resData.name,
    items,
    totalAmount,
    date: resData.date
  });
};
