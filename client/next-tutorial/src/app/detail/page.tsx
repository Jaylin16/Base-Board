import dynamic from "next/dynamic";

const Detail = dynamic(() => import("@/component/pages/board/DetailPage"), {
  ssr: false,
});

export default Detail;
