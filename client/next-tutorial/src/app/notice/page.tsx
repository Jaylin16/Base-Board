import dynamic from "next/dynamic";

const Notice = dynamic(() => import("@/component/pages/board/NoticePage"), {
  ssr: false,
});

export default Notice;
