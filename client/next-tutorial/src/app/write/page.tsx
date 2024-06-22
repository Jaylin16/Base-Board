import dynamic from "next/dynamic";

const Write = dynamic(() => import("@/component/pages/board/WritePage"), {
  ssr: false,
});

export default Write;
