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

interface categoryListType {
  name: string;
  category: string;
}

const WritePage = ({ searchParams }: WritePageProps) => {
  const router = useRouter();
  const postBoard = usePostBoard();

  const [type, setType] = useState<string>(searchParams?.get("main") as string);
  const [title, setTitle] = useState<string>();
  const [category, setCategory] = useState<string>("");
  const [categoryList, setCategoryList] = useState<{
    list: categoryListType[];
  }>();
  const [contents, setContents] = useState<string>();
  const [disableButton, setDisableButton] = useState(false);

  const typeArr = [
    { name: "kbo", type: "KBO" },
    { name: "baseball", type: "야구" },
    { name: "board", type: "자유" },
    { name: "notice", type: "공지" },
  ];

  const kboArr = [
    { name: "SSG", category: "SSG 랜더스" },
    { name: "KIA", category: "KIA 타이거즈" },
    { name: "LG", category: "LG 트윈스" },
    { name: "한화", category: "한화 이글스" },
    { name: "KT", category: "KT 위즈" },
    { name: "NC", category: "NC 다이노스" },
    { name: "키움", category: "키움 히어로즈" },
    { name: "두산", category: "두산 베어스" },
    { name: "롯데", category: "롯데 자이언츠" },
    { name: "삼성", category: "삼성 라이온즈" },
  ];

  const boardArr = [
    { name: "뉴스", category: "뉴스" },
    { name: "정보", category: "정보" },
    { name: "기타", category: "기타" },
    { name: "이슈", category: "이슈" },
    { name: "유머", category: "유머" },
  ];

  const noticeArr = [
    { name: "중요", category: "중요 공지" },
    { name: "일반", category: "일반 공지" },
  ];

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
      events: {
        change: () => handleChangeEditor(editorRef.current?.getMarkdown()),
      },
    });

    return () => {
      if (editorRef.current && editorElRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  const handleChangeEditor = (content: string | undefined) => {
    setContents(content);
  };

  const submitHandler = () => {
    if (
      type === undefined ||
      type === "" ||
      type === "hot" ||
      type === "total"
    ) {
      return alert("글타입을 선택해주세요.");
    }

    if (category === "") {
      return alert("카테고리를 선택해주세요.");
    }

    if (!title || title.trim().length < 1) {
      return alert("제목을 2자 이상 입력해주세요.");
    }

    if (!contents || contents.trim().length < 10) {
      return alert("내용을 10자 이상 입력해주세요.");
    }

    setDisableButton(true);

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
      category: category,
      boardTitle: title,
      boardContents: html,
    };

    postBoard.mutate(data, {
      onSuccess: (res) => {
        setDisableButton(true);

        router.push(`/${type}`);
      },
      onError: (err) => {
        alert("작성된 글을 저장하는데 실패했습니다. 다시 시도해주세요.");

        setDisableButton(false);
      },
    });
  };

  const titleInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const dropdownHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const typeDropdownHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const dropdownListHandler = () => {
    let data;

    if (type === "board") {
      data = {
        list: boardArr,
      };
    } else if (type === "notice") {
      data = { list: noticeArr };
    } else {
      data = {
        list: kboArr,
      };
    }

    setCategoryList(data);
  };

  return (
    <>
      <div css={baseLayout}>
        <div css={pageTitleStyle}>✏️ {type?.toUpperCase()} 글쓰기</div>
        <div css={writeFieldStyle}>
          <div css={inputWrapper}>
            <div css={titleInputWrapper}>
              <div css={categoryStyle}>
                <select
                  name="category"
                  id="dropdown"
                  css={dropdownStyle}
                  defaultValue={type}
                  onChange={typeDropdownHandler}
                >
                  <option value=""> —— 글타입 —— </option>;
                  {typeArr?.map((item, index) => {
                    return (
                      <option key={index} value={item.name}>
                        {item.type}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div css={categoryStyle}>
                <select
                  name="category"
                  id="dropdown"
                  css={dropdownStyle}
                  onChange={dropdownHandler}
                  onClick={dropdownListHandler}
                >
                  <option value=""> —— 카테고리 —— </option>;
                  {categoryList?.list.map((item, index) => {
                    return (
                      <option key={index} value={item.name}>
                        {item.category}
                      </option>
                    );
                  })}
                </select>
              </div>

              <input
                css={titleInputStyle}
                type="text"
                name="title"
                placeholder="제목을 입력해주세요."
                onChange={titleInputHandler}
              />
            </div>

            <div id="editor" ref={editorElRef}></div>
          </div>

          <button
            css={writeButtonStyle(
              !!title && title.length > 1 && !!contents && contents.length > 10
            )}
            onClick={submitHandler}
            disabled={disableButton}
          >
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

const writeButtonStyle = (isContents: boolean) => css`
  padding: 26px 71px;
  border-radius: 20px;
  background: ${isContents ? "#7d9dcf" : "#999999"};
  font-size: 20px;
  width: 216px;
  height: 79px;
  margin-bottom: 40px;

  cursor: pointer;
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
  align-items: center;
  justify-content: center;

  width: 216px;
  height: 51px;
  padding: 14px 31px;
  color: #999999;
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

const dropdownStyle = css`
  font-size: 20px;
  border: transparent;
`;
