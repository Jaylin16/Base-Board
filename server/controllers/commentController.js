const express = require("express");
const commentService = require("../service/commentService");

const { auth } = require("../middleware/auth");

const commentController = express.Router();

//댓글 작성
commentController.post("/write", auth, commentService.createComment);

//댓글 수정
commentController.put("/:commentId", auth, commentService.updateComment);

//댓글 삭제
commentController.delete("/:commentId", auth, commentService.deleteComment);

module.exports = { commentController };
