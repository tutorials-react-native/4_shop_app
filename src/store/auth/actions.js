import { AsyncStorage } from "react-native";

import { authApi } from "api";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOG_OUT = "LOG_OUT";

let timer;

export const logOut = () => dispatch => {
  clearTimeout(timer);
  AsyncStorage.removeItem("authData");
  return dispatch({ type: LOG_OUT });
};

export const setAuthExpireTime = expireTime => dispatch => {
  timer = setTimeout(() => {
    dispatch(logOut());
  }, expireTime);
};

export const storeAuthToStorage = (token, userId, expiresIn) => {
  const expireDate = new Date(
    new Date().getTime() + expiresIn * 1000
  ).toISOString();
  AsyncStorage.setItem(
    "authData",
    JSON.stringify({
      token,
      userId,
      expireDate
    })
  );
};

export const signUp = (email, password) => async dispatch => {
  const response = await authApi.signUp(email, password);
  const resData = response.data;
  const { idToken, localId, expiresIn } = resData;
  dispatch(
    authenticate({
      token: idToken,
      userId: localId,
      expireTime: expiresIn * 1000
    })
  );
  storeAuthToStorage(idToken, localId, expiresIn);
};

export const login = (email, password) => async dispatch => {
  const response = await authApi.login(email, password);
  const resData = response.data;
  const { idToken, localId, expiresIn } = resData;
  dispatch(
    authenticate({
      token: idToken,
      userId: localId,
      expireTime: expiresIn * 1000
    })
  );
  storeAuthToStorage(idToken, localId, expiresIn);
};

export const authenticate = ({ token, userId, expireTime }) => dispatch => {
  dispatch(setAuthExpireTime(expireTime));
  dispatch({
    type: AUTHENTICATE,
    token,
    userId
  });
};
