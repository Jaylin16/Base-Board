import Axios from "axios";

const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  function (res) {
    const cookie = document.cookie;

    if (!cookie.split("=")[1]) {
      localStorage.removeItem("nickName");
    }

    return res;
  },
  function (err) {
    const statusCode = err.response.status;

    //토큰이 없는 경우
    if (statusCode === 401) {
      alert("로그인이 필요한 서비스 입니다.");
      window.location.href = "/login";
    }

    return err;
  }
);

export default api;
