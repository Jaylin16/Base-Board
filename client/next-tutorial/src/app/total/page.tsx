import dynamic from "next/dynamic";

const Total = dynamic(() => import("@/component/pages/board/TotalPage"), {
  ssr: false,
});

export default Total;
