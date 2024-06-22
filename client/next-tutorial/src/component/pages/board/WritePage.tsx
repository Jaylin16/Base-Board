"use client";
import { css } from "@emotion/react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/editor";
import { useEffect, useRef, useState } from "react";
import { usePostBoard } from "@/api/board/useBoardApi";
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";

interface WritePageProps {
  searchParams: ReadonlyURLSearchParams;
}

const WritePage = ({ searchParams }: WritePageProps) => {
  const router = useRouter();
  const postBoard = usePostBoard();

  const [title, setTitle] = useState<string>();
  const [category, setCategory] = useState<string>();

  const type = searchParams?.get("main") as string;

  const editorElRef = useRef(null); // id: editor element 의 reference
  const editorRef = useRef<null | Editor>(null); // new Editor instance

  useEffect(() => {
    const editorEl = editorElRef.current;
    if (!editorEl) {
      console.error("Editor element not found");
    }

    editorRef.current = new Editor({
      el: editorEl,
      height: "600px",
      initialEditType: "markdown",
      previewStyle: "vertical",
      initialValue: "",
      placeholder: "내용을 10자 이상 입력해주세요.",
    });

    return () => {
      if (editorRef.current && editorElRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const submitHandler = () => {
    const html = editorRef.current?.getHTML();

    const data = {
      type:
        type === "baseball"
          ? "야구"
          : type === "board"
          ? "자유"
          : type === "notice"
          ? "공지"
          : type,
      category: category || "카테고리",
      boardTitle: title,
      boardContents: html,
    };

    postBoard.mutate(data, {
      onSuccess: (res) => {
        router.push(`/${type}`);
      },
      onError: (err) => {
        alert("작성된 글을 저장하는데 실패했습니다.");
      },
    });
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else {
      setCategory(event.target.value);
    }
  };

  return (
    <>
      <div css={baseLayout}>
        <div css={pageTitleStyle}>✏️ {type?.toUpperCase()} 글쓰기</div>
        <div css={writeFieldStyle}>
          <div css={inputWrapper}>
            <div css={titleInputWrapper}>
              <div css={categoryStyle} onChange={inputHandler}>
                카테고리
              </div>
              <input
                css={titleInputStyle}
                type="text"
                name="title"
                placeholder="제목을 입력해주세요."
                onChange={inputHandler}
              />
            </div>

            <div id="editor" ref={editorElRef}></div>
          </div>

          <button css={writeButtonStyle} onClick={submitHandler}>
            등록하기
          </button>
        </div>
      </div>
    </>
  );
};

export default WritePage;

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

const categoryStyle = css`
  border-radius: 14px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid #999999;
  display: flex;
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
  display: flex;
  flex: 1;
  padding: 14px 29px;

  ::placeholder {
    color: #999999;
  }
`;

const titleInputWrapper = css`
  gap: 17px;
  width: 100%;

  display: flex;
  margin-bottom: 30px;
`;

const inputWrapper = css`
  padding: 35px;
  width: 100%;

  display: flex;
  justify-content: center;
  flex-direction: column;
`;
