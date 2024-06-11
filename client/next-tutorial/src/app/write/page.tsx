"use client";
import { css } from "@emotion/react";

const Write = ({ type }: { type?: string }) => {
  return (
    <>
      <div css={baseLayout}>
        <div css={pageTitleStyle}>✏️ {type?.toUpperCase()} 글쓰기</div>
        <div css={writeFieldStyle}>
          <div css={inputWrapper}>
            <div css={titleInputWrapper}>
              <div css={headStyle}>말머리</div>
              <input
                css={titleInputStyle}
                type="text"
                placeholder="제목을 입력해주세요."
              />
            </div>

            <div css={addPhotoStyle}>사진 입력</div>

            <input
              css={contentInputStyle}
              type="text"
              placeholder="내용을 입력해주세요."
            />
          </div>

          <button css={writeButtonStyle}>등록하기</button>
        </div>
      </div>
    </>
  );
};

export default Write;

const baseLayout = css`
  height: calc(100vh - 97px);
  width: 100%;
  padding: 27px 10%;
`;

const pageTitleStyle = css`
  border-bottom: 1.5px solid #1d3d65;
  font-size: 18px;

  color: #1d3d65;
`;

const writeButtonStyle = css`
  padding: 26px 71px;
  border-radius: 20px;
  background: #517dbf;
  font-size: 20px;
  width: 216px;
  height: 79px;
  margin-bottom: 40px;
`;

const writeFieldStyle = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const headStyle = css`
  border-radius: 14px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid #999999;
  width: 216px;
  height: 51px;
  padding: 14px 31px;
  color: #999999;
  font-size: 20px;
`;

const titleInputStyle = css`
  font-size: 20px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid #999999;
  border-radius: 14px;
  height: 51px;
  width: 927px;
  padding: 14px 29px;

  ::placeholder {
    color: #999999;
  }
`;

const contentInputStyle = css`
  border: 1px solid #999999;
  border-radius: 14px;
  width: 1160px;
  height: 546px;
  font-size: 20px;

  padding: 34px 37px;
`;

const addPhotoStyle = css`
  border-radius: 14px;
  border: 1px solid #999999;
  width: 210px;
  height: 51px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  color: #999999;
  font-size: 20px;
  margin-bottom: 26px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const titleInputWrapper = css`
  gap: 17px;
  display: flex;
  margin-bottom: 30px;
`;

const inputWrapper = css`
  padding: 35px;

  display: flex;
  justify-content: center;
  flex-direction: column;
`;
