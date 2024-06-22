import dynamic from "next/dynamic";

const Home = dynamic(() => import("@/component/pages/HomePage"), {
  ssr: false,
});

export default Home;
