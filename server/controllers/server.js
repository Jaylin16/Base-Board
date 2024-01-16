const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const config = require("../config/key");

const { auth } = require("../middleware/auth");
const { Board } = require("../models/Board");

const { loginController } = require("../controllers/loginController");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/", loginController);

app.listen(port, () => {
  console.log(`${port}서버에 연결되었습니다.`);
});

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB가 연결되었습니다."))
  .catch((error) => console.log(error));

app.get("/hello", (req, res) => {
  return res.send("Hello");
});

//게시물 작성
app.post("/board/write", auth, async (req, res) => {
  const userId = req.user._id.toString();
  const userNickname = req.user.nickName;

  const body = req.body;

  const board = new Board({
    boardWriterId: userId,
    boardWriterNickname: userNickname,
    boardTitle: body.boardTitle,
    boardContents: body.boardContents,
  });

  await board.save().then(() => {
    res.json({
      boardWriteSuccess: true,
      message: `${userNickname} 님이 작성하신 게시물이 저장되었습니다.`,
    });
  });
});

//게시물 리스트 불러오기
app.get("/board/list", auth, async (req, res) => {
  try {
    const boardList = await Board.find();

    return res.send(boardList);
  } catch (err) {
    return res.json({
      message: "리스트를 불러오는데 실패했습니다.",
    });
  }
});

//게시물 상세 불러오기
app.get("/board/:boardId", auth, async (req, res) => {
  try {
    const boardId = req.params.boardId;

    const board = new Board();
    const targetBoard = await board.findDetailBoard(boardId);

    return res.json({
      targetBoard: targetBoard,
      boardReadSuccess: true,
    });
  } catch (err) {
    return res.json({
      boardReadSuccess: false,
      message: "해당 게시글이 없습니다.",
    });
  }
});

//게시물 수정
app.put("/board/:boardId", auth, async (req, res) => {
  const boardId = req.params.boardId;
  const userId = req.user._id;

  const targetBoard = await Board.findOne({ _id: boardId });

  if (userId.toString() === targetBoard.boardWriterId) {
    await Board.findByIdAndUpdate(boardId, req.body).then(() => {
      res.json({
        message: "게시물 수정이 완료되었습니다.",
      });
    });
  } else {
    return res.json({
      message: "작성자만 수정 가능합니다.",
    });
  }
});

//게시물 삭제
app.delete("/board/:boardId", auth, async (req, res) => {
  const boardId = req.params.boardId;

  await Board.deleteOne({ _id: boardId });

  return res.json({
    message: "게시물이 삭제되었습니다.",
  });
});