import dynamic from "next/dynamic";

const Register = dynamic(() => import("@/component/pages/user/RegisterPage"), {
  ssr: false,
});

export default Register;
