"use client";

import { useGetBoardDetail } from "@/api/board/useBoardApi";
import { useCreateComment } from "@/api/comment/useCommentApi";
import { css } from "@emotion/react";
import { useState } from "react";

interface commentType {
  _id: string;
  commentWriterId: string;
  commentWriterNickname: string;
  commentContent: string;
  createdAt: Date;
}

const DetailPage = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetBoardDetail(id);
  const [commentContent, setCommentContent] = useState<string>();

  const createComment = useCreateComment();

  const content = data?.targetBoard;

  const boardIntlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const commentIntlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatDate = (date: Date, IntlOption: Intl.DateTimeFormatOptions) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat("ko", IntlOption).format(newDate);
  };

  const submitHandler = () => {
    const data = {
      commentContent: commentContent,
      boardId: id,
    };

    createComment.mutate(data, {
      onSuccess: () => {
        setCommentContent("");
      },
    });
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCommentContent(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div css={rootStyle}>
        <div css={boardTitleStyle}>
          📝 {content?.boardType.toUpperCase()} 게시판
          <div css={fristLineStyle}>
            <div css={titleWrapper}>
              <span>{content?.boardCategory}</span>
              <span>{content?.boardTitle}</span>
            </div>

            <div css={hitWrapper}>
              <span>👀 {content?.hit}</span>
              <span>💬 {content?.comments.length}</span>
            </div>
          </div>
          <div css={secondLineStyle}>
            <div>작성자: {content?.boardWriterNickname}</div>
            <div>
              작성 일자: {formatDate(content?.createdAt, boardIntlOptions)}
            </div>
          </div>
        </div>

        <div css={contentBoxStyle}>
          <div
            dangerouslySetInnerHTML={{ __html: content.boardContents }}
          ></div>
        </div>

        <div>
          <div css={totalCommentStyle}>💬 {content?.comments.length}</div>

          {content?.comments?.map((comment: commentType) => {
            return (
              <div key={comment._id}>
                <div css={commentStyle}>
                  <span> {comment.commentWriterNickname} </span>
                  <span>
                    {formatDate(comment.createdAt, commentIntlOptions)}
                  </span>
                  <div css={commentContentStyle}> {comment.commentContent}</div>
                </div>
              </div>
            );
          })}

          <div css={commentInputWrapper}>
            <input
              type="text"
              placeholder="댓글을 입력해주세요."
              name="commentContent"
              value={commentContent}
              onChange={inputHandler}
            />
            <button css={commentButton} onClick={submitHandler}>
              댓글 등록
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;

const rootStyle = css`
  height: calc(100vh - 97px);
  padding: 27px 10%;
`;

const boardTitleStyle = css`
  font-size: 18px;
`;

const fristLineStyle = css`
  color: #555555;
  border-top: 1.5px solid #1d3d65;
  border-bottom: 1px solid #d9d9d9;
  padding: 16px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const hitWrapper = css`
  display: flex;
  gap: 42.5px;
`;

const titleWrapper = css`
  display: flex;
  gap: 86px;
`;

const secondLineStyle = css`
  color: #555555;
  border-bottom: 1px solid #d9d9d9;
  padding: 8px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const contentBoxStyle = css`
  min-height: 500px;
  padding: 50px 30px;
`;

const totalCommentStyle = css`
  border-bottom: 1px solid #999999;
  padding-bottom: 17px;
`;

const commentStyle = css`
  border-bottom: 1px solid #d9d9d9;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 13px 17px 34px 17px;

  span {
    margin-right: 11px;
    color: #999999;
    font-size: 13px;
  }

  span:first-child {
    font-size: 18px;
  }
`;

const commentButton = css`
  background: #7d9dcf;
  font-size: 18px;
  height: 50px;
  width: 155.71px;
  border-radius: 5px;
  padding: 7.14px 30px;

  cursor: pointer;
`;

const commentInputWrapper = css`
  display: flex;
  gap: 14px;
  padding: 42px 0 56px 0;

  input {
    border-radius: 5px;
    border: 1px solid #999999;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    padding-left: 24px;

    height: 51px;
    width: 100%;

    ::placeholder {
      font-size: 18px;
      color: #999999;
    }
  }
`;

const commentContentStyle = css`
  padding-top: 23px;
`;
