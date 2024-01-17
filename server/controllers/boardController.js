const express = require("express");
const boardService = require("../service/boardService");

const { auth } = require("../middleware/auth");

const boardController = express.Router();

//게시물 작성
boardController.post("/write", auth, boardService.createBoard);

//게시물 리스트 불러오기
boardController.get("/list", auth, boardService.getBoardList);

//게시물 상세 불러오기
boardController.get("/:boardId", auth, boardService.getBoardDetail);

//게시물 수정
boardController.put("/:boardId", auth, boardService.editBoard);

//게시물 삭제
boardController.delete("/:boardId", auth, boardService.deleteBoard);

module.exports = { boardController };
