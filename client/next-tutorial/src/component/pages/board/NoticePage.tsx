"use client";
import { useGetBoardList } from "@/api/board/useBoardApi";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Pagination, PaginationItem } from "@mui/material";

const NoticePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const { data, refetch } = useGetBoardList("공지", page, pageSize);

  const formatDate = (date: Date) => {
    const newDate = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("ko", options).format(newDate);
  };

  useEffect(() => {
    refetch();
  }, [page]);

  const onPageChange = (event: React.ChangeEvent<any>, newPage: number) => {
    setPage(newPage);
  };

  const onClickWriteButton = () => {
    const currentParmas = Object.fromEntries(searchParams);
    let newSearchParmas = { ...currentParmas };
    newSearchParmas = {
      ...currentParmas,
      main: `${pathname.slice(1)}`,
      page: `write`,
    };

    router.push(`?${new URLSearchParams(newSearchParmas)}`);
  };

  const onClickDetailButton = (id: string) => {
    const currentParmas = Object.fromEntries(searchParams);
    let newSearchParmas = { ...currentParmas };
    newSearchParmas = {
      ...currentParmas,
      main: `${pathname.slice(1)}`,
      page: `detail`,
      item_id: id,
    };

    router.push(`?${new URLSearchParams(newSearchParmas)}`);
  };

  return (
    <>
      <div css={rootStyle}>
        <div css={titleWrapper}>
          <div css={titleStyle}> 📌 공지사항 </div>
          <div css={writeButton} onClick={onClickWriteButton}>
            ✏️ 글 작성
          </div>
        </div>

        <div>
          <div css={firstLineStyle}>
            <span className="noStyle">no</span>
            <span className="categoryStyle">카테고리</span>
            <span className="titleStyle">제목</span>
            <span className="writerStyle">작성자</span>
            <span className="dateStyle">날짜</span>
            <span className="hitStyle">조회</span>
          </div>

          <div>
            {data &&
              data?.boardList?.map(
                (content: any, index: number, value: string) => {
                  return (
                    <div
                      css={lineStyle(index + 1 === value.length)}
                      key={content._id}
                      onClick={() => {
                        onClickDetailButton(content._id);
                      }}
                    >
                      <span className="noStyle"> {content.boardId} </span>
                      <span className="categoryStyle">
                        {content.boardCategory}
                      </span>
                      <span css={listTitleStyle}> {content.boardTitle} </span>
                      <span css={writerStyle}>
                        <div css={shortTextStyle}>
                          {content.boardWriterNickname}
                        </div>
                      </span>
                      <span className="dateStyle">
                        {formatDate(content.createdAt)}
                      </span>
                      <span className="hitStyle"> {content.hit} </span>
                    </div>
                  );
                }
              )}
          </div>
        </div>

        <div css={pageWrapper}>
          <Pagination
            count={data?.totalPages}
            page={page}
            onChange={onPageChange}
            size="medium"
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "15px 0",
            }}
            renderItem={(item) => (
              <PaginationItem {...item} sx={{ fontSize: 12 }} />
            )}
          />
        </div>
      </div>
    </>
  );
};

export default NoticePage;

const rootStyle = css`
  height: calc(100vh - 97px);
  padding: 35px 10%;
`;

const titleStyle = css`
  color: #1d3d65;
`;

const writeButton = css`
  width: 92px;
  height: 35px;
  background: #7d9dcf;
  border-radius: 5px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 9px;
  cursor: pointer;
`;

const titleWrapper = css`
  display: flex;
  justify-content: space-between;
`;

const firstLineStyle = css`
  background: rgba(219, 176, 52, 0.5);
  border-top: 1.5px solid #1d3d65;
  padding: 16px 0px;
  display: flex;
  justify-content: space-around;

  .noStyle {
    width: 7%;
    display: flex;
    justify-content: center;
  }

  .categoryStyle {
    width: 10%;
    display: flex;
    justify-content: center;
  }

  .titleStyle {
    width: 50%;
    display: flex;
    justify-content: center;
  }

  .writerStyle {
    width: 13%;
    display: flex;
    justify-content: center;
  }

  .dateStyle {
    width: 10%;
    display: flex;
    justify-content: center;
  }

  .hitStyle {
    width: 10%;
    display: flex;
    justify-content: center;
  }
`;

const lineStyle = (isLast: boolean) => css`
  border-bottom: ${!isLast && "1px solid #d9d9d9"};
  height: 58px;
  display: flex;
  align-items: center;
  cursor: pointer;

  .noStyle {
    width: 7%;
    display: flex;
    justify-content: center;
  }

  .categoryStyle {
    width: 10%;
    display: flex;
    justify-content: center;
  }

  .dateStyle {
    width: 10%;
    display: flex;
    justify-content: center;
  }

  .hitStyle {
    width: 10%;
    display: flex;
    justify-content: center;
  }
`;

const listTitleStyle = css`
  width: 50%;
  justify-content: flex-start;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const writerStyle = css`
  width: 13%;
  display: flex;
  justify-content: center;
`;

const shortTextStyle = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const pageWrapper = css`
  bottom: 40px;
  left: 50%;
`;
