const { Board } = require("../models/Board");

//게시물 작성
const createBoard = async (req, res) => {
  const userId = req.user._id.toString();
  const userNickname = req.user.nickName;

  const body = req.body;

  const board = new Board({
    boardType: body.type,
    boardCategory: body.category,
    boardWriterId: userId,
    boardWriterNickname: userNickname,
    boardTitle: body.boardTitle,
    boardContents: body.boardContents,
  });

  try {
    await board.save().then(() => {
      res.status(200).json({
        boardWriteSuccess: true,
        message: `${userNickname} 님이 작성하신 게시물이 저장되었습니다.`,
      });
    });
  } catch (err) {
    res.status(400).json({
      boardWriteSuccess: false,
      message: `${userNickname} 님이 작성하신 게시물 저장에 실패했습니다.`,
    });
  }
};

//게시물 리스트 불러오기
const getBoardList = async (req, res) => {
  try {
    const { type, page = 1, pageSize = 10 } = req.query;

    let boardList;
    let totalBoards;

    if (type === "전체") {
      boardList = await Board.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ createdAt: -1 });

      totalBoards = await Board.countDocuments();
    } else if (type === "hot") {
      boardList = await Board.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ hit: -1 });

      totalBoards = await Board.countDocuments();
    } else {
      boardList = await Board.find({ boardType: type })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ createdAt: -1 });

      totalBoards = await Board.countDocuments({ boardType: type });
    }

    const totalPages = Math.ceil(totalBoards / pageSize);

    return res.send({ boardList, totalPages, totalBoards, currentPage: page });
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

    //한개의 게시물 메모리 크기 확인을 위한 코드
    const targetBoardSize = Buffer.byteLength(
      JSON.stringify(targetBoard),
      "utf8"
    );
    console.log("targetBoardSize====>", `${targetBoardSize} byte`);

    await Board.findByIdAndUpdate(targetBoard._id, {
      hit: targetBoard.hit + 1,
    });

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
  try {
    const user = req.user;
    const boardId = req.params.boardId;
    const board = await Board.findById(boardId);

    //해당 게시글이 DB에 있는 게시글인지 확인
    if (!board) {
      return res.status(404).json({
        deleteSuccess: false,
        message: "해당하는 게시글이 없습니다.",
      });
    }

    //권한이 있는 요청인지 확인
    if (user._id.toString() !== board.boardWriterId) {
      return res.status(403).json({
        deleteSuccess: false,
        message: "권한이 없는 요청입니다.",
      });
    }

    await board.deleteOne();

    return res.status(200).json({
      deleteSuccess: true,
      message: "게시물이 삭제되었습니다.",
    });
  } catch (err) {
    return res.status(500).json({
      deleteSuccess: false,
      message: "게시물 삭제에 실패했습니다.",
    });
  }
};

module.exports = {
  createBoard,
  getBoardList,
  getBoardDetail,
  editBoard,
  deleteBoard,
};
