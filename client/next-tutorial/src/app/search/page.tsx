"use client";

import { useGetSearch } from "@/api/search/useSearchApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { css } from "@emotion/react";

interface boardListType {
  _id: string;
  boardId: number;
  boardCategory: string;
  boardType: string;
  boardTitle: string;
  hit: number;
  createdAt: Date;
}

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const keyword = searchParams.get("keyword");

  const { data, refetch, isLoading } = useGetSearch(keyword || "");

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
  }, [keyword]);

  const onClickDetailButton = (id: string) => {
    const currentParmas = Object.fromEntries(searchParams);
    let newSearchParmas = { ...currentParmas };
    newSearchParmas = {
      ...currentParmas,
      page: `detail`,
      item_id: id,
    };

    router.push(`?${new URLSearchParams(newSearchParmas)}`);
  };

  return (
    <>
      <div css={rootStyle}>
        <div css={titleWrapper}>
          <div css={titleStyle}> 🔎 `{keyword}` 검색결과 </div>
        </div>

        <div>
          {data?.length < 1 ? (
            <div css={noResultStyle}>
              검색하신 키워드에 일치하는 게시물이 없습니다.
            </div>
          ) : (
            <div>
              <div css={firstLineStyle}>
                <span className="noStyle">no</span>
                <span className="categoryStyle">카테고리</span>
                <span className="titleStyle">제목</span>
                <span className="dateStyle">날짜</span>
                <span className="hitStyle">조회</span>
              </div>

              {data?.map(
                (item: boardListType, index: number, value: string) => {
                  return (
                    <div
                      css={lineStyle(index + 1 === value.length)}
                      key={index}
                      onClick={() => onClickDetailButton(item._id)}
                    >
                      <span className="noStyle"> {item.boardId} </span>
                      <span className="categoryStyle">
                        {item.boardType} / {item.boardCategory}
                      </span>
                      <span css={listTitleStyle}> {item.boardTitle} </span>
                      <span className="dateStyle">
                        {formatDate(item.createdAt)}
                      </span>
                      <span className="hitStyle"> {item.hit} </span>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;

const rootStyle = css`
  height: calc(100vh - 97px);
  padding: 35px 10%;
  position: relative;
`;

const titleStyle = css`
  color: #1d3d65;
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
    width: 63%;
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
  width: 63%;
  justify-content: flex-start;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const noResultStyle = css`
  padding: 30px;
`;
