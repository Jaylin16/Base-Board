interface BOARDTYPE {
  [key: string]: { title: string; korean: string };
  total: { title: string; korean: string };
  hot: { title: string; korean: string };
  kbo: { title: string; korean: string };
  baseball: { title: string; korean: string };
  board: { title: string; korean: string };
  notice: { title: string; korean: string };
}

export const BOARD: BOARDTYPE = {
  total: { title: "📜 전체게시물", korean: "전체" },
  kbo: { title: "🇰🇷 KBO 게시판", korean: "kbo" },
  hot: { title: "🔥 HOT 게시판", korean: "hot" },
  baseball: { title: "⚾️ 야구 게시판", korean: "야구" },
  board: { title: "📝 자유게시판", korean: "자유" },
  notice: { title: "📌 공지사항", korean: "공지" },
};
