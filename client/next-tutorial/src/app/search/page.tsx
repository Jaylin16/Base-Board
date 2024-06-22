import dynamic from "next/dynamic";

const Search = dynamic(() => import("@/component/pages/board/SearchPage"), {
  ssr: false,
});

export default Search;
