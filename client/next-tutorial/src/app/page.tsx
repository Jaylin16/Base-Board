"use client";
import { useGetBoardsList } from "@/api/board/useBoardApi";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import CustomCarousel from "../component/common/CustomCarousel";
import { EmblaOptionsType } from "embla-carousel";
import image1 from "../../public/image/carousel/carousel 1.png";
import image2 from "../../public/image/carousel/carousel 2.png";
import image3 from "../../public/image/carousel/carousel 3.png";
import image4 from "../../public/image/carousel/carousel 4.png";

interface boardType {
  _id: string;
  boardId: number;
  boardTitle: string;
}

const Home = () => {
  const router = useRouter();

  const OPTIONS: EmblaOptionsType = { dragFree: true };

  const SLIDES = [
    { no: 1, src: image1 },
    { no: 2, src: image2 },
    { no: 3, src: image3 },
    { no: 4, src: image4 },
  ];

  const listParams = [
    { type: "kbo", page: 1, pageSize: 7 },
    { type: "hot", page: 1, pageSize: 15 },
    { type: "야구", page: 1, pageSize: 4 },
    { type: "자유", page: 1, pageSize: 4 },
    { type: "공지", page: 1, pageSize: 4 },
  ];

  const { data, pending } = useGetBoardsList(listParams);

  const onClickHandler = (boardId: string, type: string) => {
    const searchParmas = {
      main: type,
      page: `detail`,
      item_id: boardId,
    };

    router.push(`?${new URLSearchParams(searchParmas)}`);
  };

  return (
    <>
      <div css={rootStyles}>
        <CustomCarousel slides={SLIDES} options={OPTIONS} />

        <div css={areaBox}>
          <div css={kboNowStyle}>
            <div>
              💡 실시간 🇰🇷 KBO
              {data?.kbo?.map((content: boardType) => {
                return (
                  <div key={content._id}>
                    <p
                      css={titleStyle}
                      onClick={() => onClickHandler(content._id, "kbo")}
                    >
                      {content.boardTitle}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="moreButton" onClick={() => router.push("/kbo")}>
              더보기 {">"}
            </div>
          </div>

          <div css={bestRankStyle}>
            <div>
              HOT 🔥 BEST RANK🏅
              {data?.hot?.map((content: boardType) => {
                return (
                  <div key={content._id}>
                    <p
                      css={titleStyle}
                      onClick={() => onClickHandler(content._id, "hot")}
                    >
                      {content.boardTitle}
                    </p>
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
              {data?.야구?.map((content: boardType) => {
                return (
                  <div key={content._id}>
                    <p
                      css={titleStyle}
                      onClick={() => onClickHandler(content._id, "야구")}
                    >
                      {content.boardTitle}
                    </p>
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
              {data?.자유?.map((content: boardType) => {
                return (
                  <div key={content._id}>
                    <p
                      css={titleStyle}
                      onClick={() => onClickHandler(content._id, "자유")}
                    >
                      {content.boardTitle}
                    </p>
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
              {data?.공지?.map((content: boardType) => {
                return (
                  <div key={content._id}>
                    <p
                      css={titleStyle}
                      onClick={() => onClickHandler(content._id, "공지")}
                    >
                      {content.boardTitle}
                    </p>
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
  padding: 0 10%;
`;

const areaBox = css`
  display: flex;
  padding: 55px 0 20px 0;
  gap: 20px;
  width: 100%;
`;

const bottomAreaBox = css`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const kboNowStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  height: 365px;
  border-radius: 14px;
  border-radius: 14px;
  box-sizing: border-box;
  border: 1px solid #517dbf;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 8;
  position: relative;

  .moreButton {
    position: absolute;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
  }
`;

const bestRankStyle = css`
  height: 365px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  border-radius: 14px;
  box-sizing: border-box;
  border: 1px solid #517dbf;
  padding: 20px;

  display: flex;
  flex-grow: 2;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

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

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  position: relative;

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

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

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

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  .moreButton {
    position: absolute;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
  }
`;

const titleStyle = css`
  margin: 10px 30px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  cursor: pointer;
`;
