import axios from "axios";
import { LOGIN_USER } from "./types";

const baseUri = process.env.REACT_APP_BASE_URI;

export function loginUser(submitData) {
  const request = axios
    .post(`${baseUri}/login`, submitData)
    .then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}
