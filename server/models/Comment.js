const mongoose = require("mongoose");
const { boardSchema } = require("./Board.js");

const commentSchema = mongoose.Schema(
  {
    commentWriterId: {
      type: String,
      require: true,
    },

    commentWriterNickname: {
      type: String,
      required: true,
    },

    commentContent: {
      type: String,
      minlength: 1,
      required: true,
    },

    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//comment save시 해당하는 Board에 저장 진행
commentSchema.pre("save", async function (next) {
  try {
    const comment = this;

    const Board = mongoose.models.Board || mongoose.model("Board", boardSchema);

    await Board.updateOne(
      { _id: comment.boardId },
      { $push: { comments: comment._id } }
    );

    next();
  } catch (err) {
    next(err);
  }
});

// comment delete시 해당하는 Board에 반영
/* { document: true, query: false }
   document 수준에서의 동작 여부, query 수준에서의 동작여부 옵션 추가
   document-level : DB에서 찾아온 document에 대해 쿼리 실행
   query-level : 모델에 직접 query를 실행 */
commentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const comment = this;

      const Board =
        mongoose.models.Board || mongoose.model("Board", boardSchema);

      await Board.updateOne(
        { _id: comment.boardId },
        { $pull: { comments: comment._id } }
      );

      next();
    } catch (err) {
      next(err);
    }
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
