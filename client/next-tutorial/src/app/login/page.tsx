import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/component/pages/user/LoginPage"), {
  ssr: false,
});

export default Login;
