"use client";
import { useGetBoardList } from "@/api/board/useBoardApi";
import { css } from "@emotion/react";

const Total = () => {
  const { data } = useGetBoardList("전체");

  const formatDate = (date: Date) => {
    const newDate = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("ko", options).format(newDate);
  };

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
            {data &&
              data?.map((content: any, index: number, value: string) => {
                return (
                  <div
                    css={lineStyle(index + 1 === value.length)}
                    key={content._id}
                  >
                    <span className="noStyle">{content.boardId}</span>

                    <span className="categoryStyle">
                      {content.boardType.toUpperCase()} /{" "}
                      {content.boardCategory}
                    </span>

                    <span className="titleStyle">{content.boardTitle}</span>

                    <span className="dateStyle">
                      {formatDate(content.createdAt)}
                    </span>

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
