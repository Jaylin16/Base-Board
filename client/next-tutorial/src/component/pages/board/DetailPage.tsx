"use client";

import { useDeleteBoard, useGetBoardDetail } from "@/api/board/useBoardApi";
import {
  useCreateComment,
  useDeleteComment,
  useUpdateComment,
} from "@/api/comment/useCommentApi";
import { css } from "@emotion/react";
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

interface commentType {
  _id: string;
  commentWriterId: string;
  commentWriterNickname: string;
  commentContent: string;
  createdAt: Date;
}

interface DetailPageProps {
  searchParams: ReadonlyURLSearchParams;
}

const DetailPage = ({ searchParams }: DetailPageProps) => {
  const router = useRouter();

  const boardId = searchParams.get("item_id") as string;

  const [commentContent, setCommentContent] = useState<string>();
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editComment, setEditComment] = useState<string>();

  const { data, isLoading, refetch } = useGetBoardDetail(boardId);
  const deleteBoard = useDeleteBoard();

  const createComment = useCreateComment();
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();

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

  /* 여기부터 이벤트 핸들러 모음 입니다. */

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCommentContent(value);
  };

  const commentEditHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEditComment(value);
  };

  /* 여기부터 버튼 핸들러 모음 입니다. */

  const submitButtonHandler = () => {
    const data = {
      commentContent: commentContent,
      boardId: boardId,
    };

    createComment.mutate(data, {
      onSuccess: () => {
        setCommentContent("");
      },
      onError: () => {
        refetch();
      },
    });
  };

  const editButtonHandler = (commentId: string, commentContent: string) => {
    if (editCommentId === null) {
      setEditCommentId(commentId);
      setEditComment(commentContent);
    } else {
      setEditCommentId(null);
    }
  };

  const saveEditCommentButtonHandler = (commentId: string) => {
    const data = {
      commentId: commentId,
      commentContent: editComment,
    };

    updateComment.mutate(data, {
      onSuccess: () => {
        setEditCommentId(null);
      },
    });
  };

  const deleteButtonHandler = (commentId: string) => {
    deleteComment.mutate(commentId);
  };

  const deleteBoardButtonHandler = () => {
    deleteBoard.mutate(boardId, {
      onSuccess: () => {
        router.push(`/${searchParams.get("main") as string}`);
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div css={rootStyle}>
        <div css={boardTitleStyle}>
          <div css={titleLineStyle}>
            📝 {content?.boardType.toUpperCase()} 게시판
            <div css={editButtonWrapper}>
              <button css={boardEditButtonStyle}>수정</button>
              <span> | </span>
              <button
                css={boardEditButtonStyle}
                onClick={deleteBoardButtonHandler}
              >
                삭제
              </button>
            </div>
          </div>

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
            <div> 작성자: {content?.boardWriterNickname} </div>
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

                  <button
                    css={commentEditButtonStyle}
                    onClick={() => {
                      editButtonHandler(comment._id, comment.commentContent);
                    }}
                  >
                    {comment._id === editCommentId ? "취소" : "수정"}
                  </button>

                  <button
                    css={saveButtonStyle(editCommentId, comment._id)}
                    onClick={() => {
                      saveEditCommentButtonHandler(comment._id);
                    }}
                  >
                    {"저장"}
                  </button>

                  <button
                    css={commentEditButtonStyle}
                    onClick={() => {
                      deleteButtonHandler(comment._id);
                    }}
                  >
                    삭제
                  </button>

                  <div css={commentContentStyle(editCommentId, comment._id)}>
                    {comment._id !== editCommentId ? (
                      <div> {comment.commentContent} </div>
                    ) : (
                      <input
                        name="editTextBox"
                        type="text"
                        value={editComment}
                        onChange={commentEditHandler}
                      />
                    )}
                  </div>
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
            <button css={commentButton} onClick={submitButtonHandler}>
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

const titleLineStyle = css`
  padding: 0 10px;

  display: flex;
  justify-content: space-between;
`;

const editButtonWrapper = css`
  display: flex;
  gap: 5px;
`;

const boardEditButtonStyle = css`
  color: black;
  font-size: 15px;

  cursor: pointer;
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
  padding: 13px 17px 34px 17px;

  span {
    margin-right: 11px;
    color: #999999;
    font-size: 13px;
  }

  span:first-of-type {
    font-size: 18px;
  }
`;

const commentEditButtonStyle = css`
  margin: 0 5px;

  color: #999999;
  cursor: pointer;
`;

const saveButtonStyle = (
  commentEditMode: string | null,
  commentId: string
) => css`
  display: ${commentEditMode !== commentId && "none"};

  color: #999999;
  cursor: pointer;
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

const commentContentStyle = (editCommentId: string | null, commentId: string) =>
  css`
    padding-top: 23px;
    font-size: 18px;

    input {
      font-size: 18px;
      width: 100%;
      height: 100%;
    }
  `;
