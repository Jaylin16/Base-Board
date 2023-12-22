import axios from "axios";
import { LOGIN_USER, REGISTER_USER } from "./types";

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

export function registerUser(submitData) {
  const request = axios
    .post(`${baseUri}/signup`, submitData)
    .then((res) => res.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}
