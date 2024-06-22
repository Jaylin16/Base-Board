import dynamic from "next/dynamic";

const Baseball = dynamic(() => import("@/component/pages/board/BaseballPage"), {
  ssr: false,
});

export default Baseball;
