import dynamic from "next/dynamic";

const Board = dynamic(() => import("@/component/pages/board/BoardPage"), {
  ssr: false,
});

export default Board;
