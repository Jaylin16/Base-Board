import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser, auth } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";

const RegisterPage = ({ option }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  // useEffect(() => {
  //   dispatch(auth()).then((res) => {
  //     console.log("res register=>", res);
  //     console.log("res.payload.isAuth =>", res.payload.isAuth);
  //     console.log("option =>", option);

  //     if (!res.payload.isAuth) {
  //       if (option) {
  //         navigate("/login");
  //       } else {
  //         navigate("/");
  //       }
  //     } else {
  //       if (!option) {
  //         navigate("/");
  //       }
  //     }
  //   });
  // }, [dispatch, navigate, option]);

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
    }

    let reqBody = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(registerUser(reqBody)).then((res) => {
      console.log('res =>', res)
      console.log("res.loginedUser",res.loginedUser);
      
      if (res.payload.registerSuccess) {
        navigate("/login");
      } else {
        alert("이미 로그인된 사용자입니다.");
        navigate("/");
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

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>ConfirmPassword</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />

        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default RegisterPage;
