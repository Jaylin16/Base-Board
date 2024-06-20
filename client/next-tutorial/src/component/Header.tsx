import { css } from "@emotion/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../public/image/header/Base-board logo.svg";
import searchIcon from "../../public/image/header/serch-Icon.svg";
import { useState } from "react";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [keyword, setKeyword] = useState<string>("");

  const menu = [
    { no: 1, title: "전체", link: "total" },
    { no: 2, title: "HOT", link: "hot" },
    { no: 3, title: "KBO", link: "kbo" },
    { no: 4, title: "야구", link: "baseball" },
    { no: 5, title: "자유", link: "board" },
    { no: 6, title: "공지", link: "notice" },
  ];

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setKeyword(value);
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
          <div css={searchStyles}>
            <input
              placeholder="게시물 검색하기"
              name="searchInput"
              onChange={searchHandler}
            />
            <button onClick={() => router.push(`/search?keyword=${keyword}`)}>
              <Image src={searchIcon} alt="search" />
            </button>
          </div>
          {localStorage.getItem("nickName") ? (
            <div>{localStorage.getItem("nickName")} </div>
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
