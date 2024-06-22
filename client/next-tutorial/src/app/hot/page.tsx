import dynamic from "next/dynamic";

const Hot = dynamic(() => import("@/component/pages/board/HotPage"), {
  ssr: false,
});

export default Hot;
