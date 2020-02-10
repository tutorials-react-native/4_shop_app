import { authApi } from "api";

export const SIGN_UP = "SIGN_UP";
export const LOG_IN = "LOG_IN";

export const signUp = (email, password) => async dispatch => {
  const response = await authApi.signUp(email, password);
  const resData = response.data;
  const { idToken, localId } = resData;
  dispatch({ type: SIGN_UP, token: idToken, userId: localId });
};

export const login = (email, password) => async dispatch => {
  const response = await authApi.login(email, password);
  const resData = response.data;
  const { idToken, localId } = resData;
  dispatch({ type: LOG_IN, token: idToken, userId: localId });
};
