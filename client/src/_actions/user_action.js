import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

const baseUri = process.env.REACT_APP_BASE_URI;

export function loginUser(submitData) {
  const request = axios
    .post(`${baseUri}/login`, submitData)
    .then((res) => res.data);

  console.log("헤더 in user_action #12======>", axios.defaults.headers);
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

export function auth() {
  const request = axios.get(`${baseUri}/auth`).then((res) => res.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
