import { orderApi } from "api";
import Order from "data/models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => async dispatch => {
  const response = await orderApi.getOrders();
  const resData = response.data;
  const orders = resData
    ? Object.keys(resData).map(key => {
        return new Order(
          key,
          resData[key].items,
          resData[key].totalAmount,
          new Date(resData[key].date)
        );
      })
    : [];
  dispatch(setOrders(orders));
};

export const setOrders = orders => ({
  type: SET_ORDERS,
  orders
});
export const addOrder = (items, totalAmount) => async (dispatch, getState) => {
  const token = getState().auth.token;
  const response = await orderApi.createOrder({ items, totalAmount, token });
  const resData = response.data;
  dispatch({
    type: ADD_ORDER,
    id: resData.name,
    items,
    totalAmount,
    date: resData.date
  });
};
