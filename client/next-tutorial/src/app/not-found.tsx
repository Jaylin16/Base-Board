import dynamic from "next/dynamic";

const NotFound = dynamic(() => import("@/component/pages/NotFoundPage"), {
  ssr: false,
});

export default NotFound;
