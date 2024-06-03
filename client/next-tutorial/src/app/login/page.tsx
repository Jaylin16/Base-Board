"use client";
import { css } from "@emotion/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CustomCheckbox from "@/component/common/CustomCheckbox";

const Login: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <div css={rootStyle}>
        <div css={loginBoxStyle}>
          <div css={loginStyle}>로그인</div>

          <div css={innerBox}>
            <div css={inputWrapper}>
              <input
                css={inputStyle}
                placeholder="아이디(이메일 입력)"
                type="text"
              />

              <input css={inputStyle} placeholder="비밀번호" type="password" />
            </div>

            <div css={loginButtonWrapper}>
              <div style={{ color: "#999999" }}>
                <CustomCheckbox
                  checked={checked}
                  onChange={handleCheckboxChange}
                  label="로그인 유지"
                />
              </div>
              <div css={loginButton}>로그인</div>
            </div>
          </div>

          <div css={registerButtonWrapper}>
            <div css={buttonStyle}>ID/PW 찾기</div> |{" "}
            <div css={buttonStyle} onClick={() => router.push("/register")}>
              회원가입
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const rootStyle = css`
  background: #ffffff;
  height: calc(100vh - 97px);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const loginBoxStyle = css`
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
  height: 274.75px;
  width: 637px;
  padding: 42.75px 0 0 0;

  display: flex;
  flex-direction: column;
`;

const loginStyle = css`
  width: 100%;
  height: 64px;
  padding: 0 30px;
  font-size: 24px;
  color: #1d3d65;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const loginButton = css`
  width: 109px;
  height: 35px;
  border-radius: 5px;
  background: #7d9dcf;
  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const inputStyle = css`
  width: 638px;
  height: 64px;
  background: #d9d9d9;
  border-radius: 14px;
  border: 1px solid #517dbf;
  padding-left: 22px;
  font-size: 20px;

  ::placeholder {
    color: #555555;

    display: flex;
    width: 638px;
    height: 24px;
  }
`;

const inputWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

const loginButtonWrapper = css`
  width: 638px;
  height: 64px;
  padding-top: 31px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const registerButtonWrapper = css`
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

export default Login;
