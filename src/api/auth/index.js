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
        console.log("error message", error.message);
        throw error;
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
        console.log("error message", error.message);
        throw error;
      });
  }
};
