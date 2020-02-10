import { AsyncStorage } from "react-native";

import { authApi } from "api";

export const AUTHENTICATE = "AUTHENTICATE";

export const signUp = (email, password) => async dispatch => {
  const response = await authApi.signUp(email, password);
  const resData = response.data;
  const { idToken, localId, expiresIn } = resData;
  dispatch(authenticate({ token: idToken, userId: localId }));
  storeAuthToStorage(idToken, localId, expiresIn);
};

export const login = (email, password) => async dispatch => {
  const response = await authApi.login(email, password);
  const resData = response.data;
  const { idToken, localId, expiresIn } = resData;
  dispatch(authenticate({ token: idToken, userId: localId }));
  storeAuthToStorage(idToken, localId, expiresIn);
};

export const authenticate = (token, userId) => ({
  type: AUTHENTICATE,
  token,
  userId
});

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
