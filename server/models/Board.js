const mongoose = require("mongoose");
const { Comment } = require("./Comment");
const autoIncrease = require("mongoose-sequence")(mongoose);

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

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

boardSchema.methods.findDetailBoard = async function (boardId) {
  try {
    const targetBoard = await Board.findOne({ _id: boardId })
      .populate({
        path: "comments",
        select:
          "_id commentWriterId commentWriterNickname commentContent createdAt",
      })
      .exec();

    return targetBoard;
  } catch (err) {
    throw err;
  }
};

//게시물 삭제시 관련 댓글 모두 삭제
boardSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const board = this;

    try {
      await Comment.deleteMany({ _id: board.comments });

      next();
    } catch (err) {
      next(err);
    }
  }
);

boardSchema.plugin(autoIncrease, { inc_field: "boardId" });

const Board = mongoose.model("Board", boardSchema);
module.exports = { Board };
