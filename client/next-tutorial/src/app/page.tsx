"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { css } from "@emotion/react";

export default function Home() {
  return (
    <>
      <div css={rootStyles}>12345</div>
    </>
  );
}

const rootStyles = css`
  width: 100vw;
`;
