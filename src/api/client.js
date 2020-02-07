import axios from "axios";
import { baseURL, firebaseSignUpURL, firebaseLoginURL } from "./config.json";

const firebaseClient = axios.create({
  baseURL
});

const firebaseSignUpClient = axios.create({
  baseURL: firebaseSignUpURL
});

const firebaseLoginClient = axios.create({
  baseURL: firebaseLoginURL
});

export { firebaseClient, firebaseSignUpClient, firebaseLoginClient };
