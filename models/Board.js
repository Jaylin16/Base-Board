const mongoose = require("mongoose");

//쿼리 확인을 위한 디버그 옵션 설정
mongoose.set("debug", true);

const boardSchema = mongoose.Schema(
  {
    boardWriterId: {
      type: String,
      required: true,
    },
    boardWriterNickname: {
      type: String,
      required: true,
    },
    boardTitle: {
      type: String,
      maxlength: 30,
      required: true,
    },
    boardContents: {
      type: String,
      minlength: 10,
      required: true,
    },
    boardMultimedia: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

boardSchema.methods.findDetailBoard = async function (boardId) {
  try {
    const targetBoard = await Board.findOne({ _id: boardId });

    return targetBoard;
  } catch (err) {
    throw err;
  }
};

const Board = mongoose.model("Board", boardSchema);
module.exports = { Board };
