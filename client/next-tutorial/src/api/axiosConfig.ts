import Axios from "axios";

const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const authApi = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

authApi.interceptors.response.use(
  function (res) {
    return res;
  },
  function (err) {
    const statusCode = err.response.status;

    //토큰이 없는 경우
    if (statusCode === 401) {
      alert("로그인이 필요한 서비스 입니다.");
      window.location.href = "/login";
    }

    //토큰은 있으나 권한이 없는 경우
    if (statusCode === 403) {
      alert("권한이 없는 요청입니다.");
    }

    return Promise.reject(err);
  }
);

export { api, authApi };
