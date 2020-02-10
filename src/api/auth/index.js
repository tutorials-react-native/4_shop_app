import { firebaseSignUpClient, firebaseLoginClient } from "../client";

export const api = {
  signUp: async (email, password) => {
    return await firebaseSignUpClient
      .post(
        "",
        { email, password, returnSecureToken: true },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .catch(error => {
        const errorId = error.response.data.error.errors[0].message;
        let message = "Something went wrong!";
        if (errorId === "EMAIL_EXISTS") {
          message = "Email already exists.";
        } else if (errorId.startsWith("TOO_MANY_ATTEMPTS_TRY_LATER ")) {
          message = "Too many attemps to login. Try later.";
        }
        throw new Error(message);
      });
  },

  login: async (email, password) => {
    return await firebaseLoginClient
      .post(
        "",
        { email, password, returnSecureToken: true },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .catch(error => {
        const errorId = error.response.data.error.errors[0].message;
        let message = "Something went wrong!";
        if (errorId === "EMAIL_NOT_FOUND") {
          message = "Wrong Email.";
        } else if (errorId === "INVALID_PASSWORD") {
          message = "Wrong password.";
        } else if (errorId === "USER_DISABLED") {
          message = "This accound is disabled.";
        } else if (errorId.startsWith("TOO_MANY_ATTEMPTS_TRY_LATER ")) {
          message = "Too many attemps to login. Try later.";
        }
        throw new Error(message);
      });
  }
};
