import dynamic from "next/dynamic";

const Kbo = dynamic(() => import("@/component/pages/board/KboPage"), {
  ssr: false,
});

export default Kbo;
