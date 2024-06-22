"use client";
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomCheckbox from "@/component/common/CustomCheckbox";
import { useUpdateSignUp } from "@/api/user/useSignUp";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [params, setParams] = useState<{
    nickName: string;
    email: string;
    password: string;
  }>({
    nickName: "",
    email: "",
    password: "",
  });

  const [checkedPassword, setCheckedPassword] = useState<string>("");
  const [emailReg, setEmailReg] = useState<boolean>(true);
  const [passwordReg, setPasswordReg] = useState<boolean>(true);
  const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);

  const blurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "email") {
      setEmailReg(emailRegex.test(event.target.value));
    } else if (event.target.name === "password") {
      setPasswordReg(passwordRegex.test(event.target.value));
    }
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParams({
      ...params,
      [event.target.name]: event.target.value,
    });
  };

  const updateSignUp = useUpdateSignUp();

  const submitHandler = () => {
    updateSignUp.mutate(params, {
      onSuccess: (res) => {
        setSignUpSuccess(true);
      },
      onError: (err) => {
        alert("회원가입에 실패했습니다.");
      },
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^[A-Za-z\d]{9,}$/;

  return (
    <>
      <div css={rootStyle}>
        <div css={registerBoxStyle}>
          <div css={registerStyle}>회원가입</div>

          <div css={innerBox}>
            <div css={inputWrapper}>
              <input
                css={inputStyle(true)}
                placeholder="닉네임"
                type="text"
                name="nickName"
                onChange={inputHandler}
              />

              <input
                css={inputStyle(emailReg)}
                placeholder="이메일을 입력하세요(아이디)"
                type="text"
                name="email"
                onChange={inputHandler}
                onBlur={blurHandler}
              />

              <input
                css={inputStyle(passwordReg)}
                placeholder="비밀번호(영어,숫자포함 9자리 이상)"
                type="password"
                name="password"
                onChange={inputHandler}
                onBlur={blurHandler}
              />

              <input
                css={inputStyle(checkedPassword === params.password)}
                placeholder="비밀번호 확인"
                type="password"
                name="checkPassword"
                onChange={(e) => {
                  setCheckedPassword(e.target.value);
                }}
              />

              <div
                css={passwordCheckStyle(
                  checkedPassword === params.password &&
                    checkedPassword.length > 8
                )}
              >
                비밀번호가 일치합니다.
              </div>
            </div>

            <div css={registerButtonWrapper}>
              <div style={{ color: "#999999" }}>
                <CustomCheckbox
                  checked={checked}
                  onChange={handleCheckboxChange}
                  label="[필수] 서비스이용약관"
                />
              </div>
              <button
                css={registerButton(
                  params.nickName.length > 1 &&
                    params.email.length > 1 &&
                    params.password.length > 1 &&
                    checkedPassword === params.password &&
                    emailReg &&
                    passwordReg
                )}
                disabled={
                  params.nickName.length < 1 &&
                  params.email.length < 1 &&
                  params.password.length < 1 &&
                  checkedPassword !== params.password
                }
                onClick={submitHandler}
              >
                회원가입
              </button>
            </div>
          </div>

          <div css={loginButtonWrapper}>
            <div css={buttonStyle}>ID/PW 찾기</div> |{" "}
            <div css={buttonStyle} onClick={() => router.push("/login")}>
              로그인
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={signUpSuccess}
        onClose={() => {
          setSignUpSuccess(false);
        }}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "16px",
            padding: "14px",
            textAlign: "center",
            width: "250px",
            height: "150px",
          },
        }}
      >
        <div css={modalWrapper}>
          <p>회원가입에 성공했습니다.</p>
          <button className="modalButton" onClick={() => router.push("/login")}>
            로그인
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default RegisterPage;

const rootStyle = css`
  background: #ffffff;
  height: calc(100vh - 97px);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const registerBoxStyle = css`
  width: 688px;
  border-radius: 14px;
  border: 1px solid #517dbf;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const innerBox = css`
  border-top: 1.5px solid #999999;
  border-bottom: 1.5px solid #999999;
  height: 455.75px;
  width: 637px;
  padding: 42.75px 0 0 0;

  display: flex;
  flex-direction: column;
`;

const registerStyle = css`
  width: 100%;
  height: 64px;
  padding: 0 30px;
  font-size: 24px;
  color: #1d3d65;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const registerButton = (isActive: boolean) => css`
  padding: 6px 25px;
  border-radius: 5px;
  background: ${isActive ? "#7d9dcf" : "#999999"};
  color: #ffffff;
  font-size: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: ${isActive && "pointer"};

  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  border: none;
`;

const inputStyle = (isValid: boolean) => css`
  width: 638px;
  height: 64px;
  background: #d9d9d9;
  border-radius: 14px;
  border: 1px solid #517dbf;
  padding-left: 22px;
  font-size: 20px;
  color: ${!isValid && "#e05b3a"};

  ::placeholder {
    color: #555555;
  }

  :focus {
    outline-color: #a53a20;

    ::placeholder {
      color: transparent;
    }
  }
`;

const inputWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

const registerButtonWrapper = css`
  width: 638px;
  height: 64px;
  padding-top: 31px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const loginButtonWrapper = css`
  width: 640px;
  height: 64px;
  color: #517dbf;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const buttonStyle = css`
  cursor: pointer;
`;

const passwordCheckStyle = (checkedPassword: boolean) => css`
  font-size: 14px;
  color: #555555;
  margin-left: 17px;
  visibility: ${!checkedPassword && "hidden"};
`;

const modalWrapper = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
  .modalButton {
    background: #517dbf;
    padding: 5px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  p {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
