"use client";

import { css } from "@emotion/react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div css={rootStyle}>
      <div css={box}>
        <h2>404 Not Found</h2>
        <h3>요청하신 페이지를 찾을 수 없습니다.</h3>

        <Link href="/">
          {">"} 홈으로 돌아가기 Click {"<"}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

const rootStyle = css`
  color: white;
  height: calc(100vh - 97px);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const box = css`
  padding: 50px;
  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: #517dbf;
`;
