import axios from "axios";
import { baseURL } from "./config.json";

const firebaseClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

export { firebaseClient };
