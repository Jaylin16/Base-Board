"use client";
import { css } from "@emotion/react";

const Total = () => {
  const content = [
    {
      no: 1,
      category: "SSG",
      title: "제목제목제목",
      date: "24.05.14",
      hit: 8100,
    },
    {
      no: 2,
      category: "SSG",
      title: "제목제목제목",
      date: "날짜날짜",
      hit: 234,
    },
    {
      no: 3,
      category: "SSG",
      title: "제목제목제목",
      date: "24.05.30",
      hit: 12345,
    },
  ];

  return (
    <>
      <div css={layoutStyle}>
        <div css={tableHeaderStyle}>
          <div>📜 전체게시물</div>
          <div css={writeButton}> ✏️ 글 작성 </div>
        </div>

        <div>
          <div css={firstLineStyle}>
            <span className="noStyle">no</span>
            <span className="categoryStyle">카테고리</span>
            <span className="titleStyle">제목</span>
            <span className="dateStyle">날짜</span>
            <span className="hitStyle">조회</span>
          </div>
          <div>
            {content.map((content, index, value) => {
              return (
                <div
                  css={lineStyle(index + 1 === value.length)}
                  key={content.no}
                >
                  <span className="noStyle">{content.no}</span>

                  <span className="categoryStyle">{content.category}</span>

                  <span className="titleStyle">{content.title}</span>

                  <span className="dateStyle">{content.date}</span>

                  <span className="hitStyle">{content.hit}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div css={pageWrapper}>
          {"<"} 1 2 3 4 5 {">"}
        </div>
      </div>
    </>
  );
};

const writeButton = css`
  border-radius: 5px;
  background: #7d9dcf;
  width: 92px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  margin-bottom: 9px;
  cursor: pointer;
`;

const tableHeaderStyle = css`
  display: flex;
  justify-content: space-between;
`;

const layoutStyle = css`
  padding: 35px 10%;
  position: relative;
  height: calc(100vh - 97px);
`;

const firstLineStyle = css`
  background: rgba(219, 176, 52, 0.5);
  border-top: 1.5px solid #1d3d65;
  display: flex;
  justify-content: space-around;
  padding: 16px 0px;

  .noStyle {
    width: 7%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .categoryStyle {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .titleStyle {
    width: 63%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dateStyle {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hitStyle {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const lineStyle = (isLast: boolean) => css`
  box-sizing: border-box;
  display: flex;
  min-height: 58px;
  width: 100%;
  border-bottom: ${!isLast && "1px solid #d9d9d9"};
  display: flex;
  align-items: center;

  .noStyle {
    width: 7%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .categoryStyle {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .titleStyle {
    width: 63%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .dateStyle {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hitStyle {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const pageWrapper = css`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: "translate(-50%, -50%)";
`;

export default Total;
