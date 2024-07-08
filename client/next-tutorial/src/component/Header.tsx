import { css } from "@emotion/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../public/image/header/Base-board logo.svg";
import searchIcon from "../../public/image/header/serch-Icon.svg";
import { useEffect, useState } from "react";
import { useAuth, useLogout } from "@/api/user/useLogin";
import { Dialog } from "@mui/material";
import userStore from "@/store/userStore";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useLogout();
  const { setId } = userStore();

  const [keyword, setKeyword] = useState<string>("");
  const [isLogout, setIsLogout] = useState(false);

  const menu = [
    { no: 1, title: "전체", link: "total" },
    { no: 2, title: "HOT", link: "hot" },
    { no: 3, title: "KBO", link: "kbo" },
    { no: 4, title: "야구", link: "baseball" },
    { no: 5, title: "자유", link: "board" },
    { no: 6, title: "공지", link: "notice" },
  ];

  //검색어 입력 중 페이지 이동시 검색어 초기화
  useEffect(() => {
    if (pathname !== "/search") {
      setKeyword("");
    }
  }, [pathname]);

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyword(value);
  };

  const searchButtonHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // onSubmit 이벤트 실행시 발생하는 새로고침 방지

    if (keyword === "") {
      alert("검색어를 입력해주세요.");
    } else {
      router.push(`/search?keyword=${keyword}`);
    }
  };

  const logoutButtonHandler = () => {
    setIsLogout(true);
  };

  const yesButtonHandler = () => {
    if (isLogout) {
      logout.mutate();

      setId("");
      setIsLogout(false);
      router.push("/");
    }
  };

  const noButtonHandler = () => {
    setIsLogout(false);
  };

  return (
    <div css={rootStyles}>
      <div css={rootInnerWrapper}>
        <div css={menuWrapper}>
          <div css={logoStyles} onClick={() => router.push("/")}>
            <Image src={Logo} width={66.4} height={57} alt="logo" />
          </div>

          <div className="menuContainer">
            {menu.map((item) => (
              <div
                css={menuItem(pathname.includes(item.link))}
                key={item.no}
                onClick={() => router.push(item.link)}
              >
                <p> {item.title} </p>
              </div>
            ))}
          </div>
        </div>

        <div css={loginWrapper}>
          <form css={searchStyles} onSubmit={searchButtonHandler}>
            <input
              placeholder="게시물 검색하기"
              name="searchInput"
              value={keyword}
              onChange={searchHandler}
            />
            <button type="submit">
              <Image src={searchIcon} alt="search" />
            </button>
          </form>

          {localStorage.getItem("nickName") ? (
            <div css={logoutWrapper}>
              <div css={nicknameStyle}>{localStorage.getItem("nickName")}</div>
              <button css={logoutButtonStyle} onClick={logoutButtonHandler}>
                로그아웃
              </button>

              <Dialog
                open={isLogout}
                onClose={() => {
                  setIsLogout(false);
                }}
                sx={{
                  "& .MuiDialog-paper": {
                    borderRadius: "16px",
                    padding: "14px",
                    textAlign: "center",
                    width: "250px",
                    height: "150px",
                  },
                }}
              >
                <div css={modalWrapper}>
                  <p> 로그아웃 하시겠습니까? </p>
                  <div css={modalButtonWrapper}>
                    <button className="buttonStyle" onClick={yesButtonHandler}>
                      예
                    </button>
                    <button className="buttonStyle" onClick={noButtonHandler}>
                      아니오
                    </button>
                  </div>
                </div>
              </Dialog>
            </div>
          ) : (
            <div
              css={loginStyles(pathname.includes("login"))}
              onClick={() => router.push("/login")}
            >
              로그인
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

const rootStyles = css`
  display: flex;
  width: 100vw;
  height: 97px;
  background-color: #517dbf;
  align-items: center;
  justify-content: center;
  padding: 0 10%;
`;

const menuWrapper = css`
  display: flex;
  gap: 70px;
  align-items: center;

  .menuContainer {
    display: flex;
    gap: 20px;
    align-items: center;
    color: #ffffff;
  }

  p {
    cursor: pointer;
  }
`;

const loginWrapper = css`
  display: flex;
  color: #ffffff;
  align-items: center;
  gap: 44px;
`;

const rootInnerWrapper = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const searchStyles = css`
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  width: 216px;
  height: 35px;
  outline: none;
  border: 1px solid transparent;
  padding: 0 15px;
  display: flex;
  align-items: center;

  input {
    background: transparent;
    border: none;

    :focus {
      border: none;
      outline: none;
    }

    ::placeholder {
      color: #ffffff;
    }
  }

  button {
    cursor: pointer;
  }
`;

const logoStyles = css`
  cursor: pointer;
`;

const loginStyles = (isActive: boolean) => css`
  cursor: pointer;
  border-radius: 5px;
  background: ${isActive ? "#ffffff" : "transparent"};
  color: ${isActive ? "#1d3d65" : "white"};
  padding: 5px 14px;
  min-width: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const menuItem = (isActive: boolean) => css`
  border-radius: 5px;
  background: ${isActive ? "#ffffff" : "transparent"};
  color: ${isActive ? "#1d3d65" : "white"};
  padding: 5px 14px;
  min-width: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const logoutWrapper = css`
  display: flex;
  gap: 30px;
`;

const nicknameStyle = css`
  width: 110px;

  @media (max-width: 1335px) {
    display: none;
  }
`;

const logoutButtonStyle = css`
  cursor: pointer;
`;

const modalWrapper = css`
  width: 100%;
  height: 100%;
  padding: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const modalButtonWrapper = css`
  display: flex;
  gap: 30px;

  .buttonStyle {
    width: 70px;
    height: 30px;

    background-color: #517dbf;
    border-radius: 5px;

    cursor: pointer;
  }
`;
