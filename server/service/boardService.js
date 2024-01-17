const { Board } = require("../models/Board");

//게시물 작성
const createBoard = async (req, res) => {
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
};

//게시물 리스트 불러오기
const getBoardList = async (req, res) => {
  try {
    const boardList = await Board.find();

    return res.send(boardList);
  } catch (err) {
    return res.json({
      message: "리스트를 불러오는데 실패했습니다.",
    });
  }
};

//게시물 상세 불러오기
const getBoardDetail = async (req, res) => {
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
};

//게시물 수정
const editBoard = async (req, res) => {
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
};

//게시물 삭제
const deleteBoard = async (req, res) => {
  const boardId = req.params.boardId;

  await Board.deleteOne({ _id: boardId });

  return res.json({
    message: "게시물이 삭제되었습니다.",
  });
};

module.exports = {
  createBoard,
  getBoardList,
  getBoardDetail,
  editBoard,
  deleteBoard,
};
