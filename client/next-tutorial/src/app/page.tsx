"use client";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

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
      <div css={rootStyles}>
        <div css={areaBox}>
          <div className="innerBox">
            <div css={carouselStyle}>Carousel</div>
            <div css={kboNowStyle}>
              <div>
                💡 실시간 🇰🇷 KBO
                {content.map((content) => {
                  return (
                    <div className={"textArea"}>
                      <p> {content.title} </p>
                    </div>
                  );
                })}
              </div>

              <div className="moreButton" onClick={() => router.push("/kbo")}>
                더보기 {">"}
              </div>
            </div>
          </div>
          <div css={bestRankStyle}>
            <div>
              HOT 🔥 BEST RANK🏅
              {content.map((content) => {
                return (
                  <div className="textArea">
                    <p> {content.title} </p>
                  </div>
                );
              })}
            </div>

            <div className="moreButton" onClick={() => router.push("/hot")}>
              더보기 {">"}
            </div>
          </div>
        </div>

        <div css={bottomAreaBox}>
          <div css={baseballStyle}>
            <div>
              ⚾️ 야구 HOT
              {content.map((content) => {
                return (
                  <div className="textArea">
                    <p> {content.title} </p>
                  </div>
                );
              })}
            </div>

            <div
              className="moreButton"
              onClick={() => router.push("/baseball")}
            >
              더보기 {">"}
            </div>
          </div>

          <div css={boardStyle}>
            <div>
              📒 자유 HOT
              {content.map((content) => {
                return (
                  <div className="textArea">
                    <p> {content.title}</p>
                  </div>
                );
              })}
            </div>

            <div className="moreButton" onClick={() => router.push("/board")}>
              더보기 {">"}
            </div>
          </div>
          <div css={noticeStyle}>
            <div>
              📌 공지
              {content.map((content) => {
                return (
                  <div className="textArea">
                    <p>{content.title}</p>
                  </div>
                );
              })}
            </div>

            <div className="moreButton" onClick={() => router.push("/notice")}>
              더보기 {">"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

const rootStyles = css`
  width: 100vw;
`;

const areaBox = css`
  margin: 0 10%;
  display: flex;
  align-items: center;
  gap: 20px;

  .innerBox {
    gap: 20px;
    width: 70%;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
  }
`;

const bottomAreaBox = css`
  margin: 0 10%;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const kboNowStyle = css`
  border-radius: 14px;
  height: 365px;
  border-radius: 14px;
  box-sizing: border-box;
  border: 1px solid #517dbf;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  .textArea {
    margin: 10px 30px;
  }

  .moreButton {
    position: absolute;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
  }
`;

const carouselStyle = css`
  height: 272px;
  box-sizing: border-box;
  border: 1px solid #517dbf;
`;

const bestRankStyle = css`
  width: 30%;
  height: 657px;
  border-radius: 14px;
  box-sizing: border-box;
  border: 1px solid #517dbf;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  .textArea {
    margin: 10px 30px;
  }

  .moreButton {
    position: absolute;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
  }
`;

const baseballStyle = css`
  width: 30%;
  height: 236px;
  border-radius: 14px;
  box-sizing: border-box;
  border: 1px solid #517dbf;
  padding: 20px;
  position: relative;

  .textArea {
    margin: 10px 30px;
  }

  .moreButton {
    position: absolute;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
  }
`;

const boardStyle = css`
  width: 50%;
  height: 236px;
  border-radius: 14px;
  box-sizing: border-box;
  border: 1px solid #517dbf;
  padding: 20px;
  position: relative;

  .textArea {
    margin: 10px 30px;
  }

  .moreButton {
    position: absolute;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
  }
`;

const noticeStyle = css`
  width: 20%;
  height: 236px;
  border-radius: 14px;
  box-sizing: border-box;
  border: 1px solid #517dbf;
  padding: 20px;
  position: relative;

  .textArea {
    margin: 10px 30px;
  }

  .moreButton {
    position: absolute;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
  }
`;
