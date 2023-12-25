import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let reqBody = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(reqBody)).then((res) => {
      console.log("res 데이터 in LoginPage #30 =======>", res);
      const headers = res.headers;
      console.log("cookie 데이터 in LoginPage #32 =======>", headers);

      // const cookie = res.headers["auth_cookie"];
      // document.cookie = cookie;

      if (res.payload.loginSuccess) {
        navigate("/");
      } else {
        alert("로그인 실패");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
