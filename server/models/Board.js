const mongoose = require("mongoose");
const autoIncrease = require("mongoose-sequence")(mongoose);

//쿼리 확인을 위한 디버그 옵션 설정
mongoose.set("debug", true);

const boardSchema = mongoose.Schema(
  {
    boardId: {
      type: Number,
      unique: true,
    },

    boardType: {
      type: String,
      required: true,
    },

    boardCategory: {
      type: String,
      required: true,
    },

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

    hit: {
      type: Number,
      default: 0,
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

boardSchema.methods.findAllByType = async function (type) {
  try {
    const boardList = await Board.find({ boardType: type });

    return boardList;
  } catch (err) {
    throw err;
  }
};

boardSchema.plugin(autoIncrease, { inc_field: "boardId" });

const Board = mongoose.model("Board", boardSchema);
module.exports = { Board };
