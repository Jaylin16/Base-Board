const { Comment } = require("../models/Comment");
const { Board } = require("../models/Board");

const createComment = async (req, res) => {
  const user = req.user;
  const body = req.body;
  const board = await Board.findOne({ _id: body.boardId });

  const comment = new Comment({
    commentWriterId: user._id.toString(),
    commentWriterNickname: user.nickName,
    commentContent: body.commentContent,
    boardId: board._id,
  });

  try {
    await comment.save();

    return res.status(200).json({
      commentWriteSuccess: true,
      message: `${user.nickName}님이 작성하신 댓글이 등록되었습니다.`,
    });
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      commentWriteSuccess: false,
      message: `${user.nickName}님이 작성하신 댓글 등록이 실패했습니다.`,
    });
  }
};

const updateComment = async (req, res) => {
  const user = req.user;
  const body = req.body;
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findOne({ _id: commentId });

    //해당 댓글이 DB에 있는 댓글인지 확인
    if (!comment) {
      return res.status(404).json({
        updateSuccess: false,
        message: "해당하는 댓글이 없습니다.",
      });
    }

    //권한이 있는 요청인지 확인
    if (user._id.toString() !== comment.commentWriterId) {
      return res.status(403).json({
        updateSuccess: false,
        message: "권한이 없는 요청입니다.",
      });
    }

    await Comment.findByIdAndUpdate(comment._id, {
      commentContent: body.commentContent,
    });

    return res.status(200).json({
      updateSuccess: true,
      message: "댓글 수정이 완료되었습니다.",
    });
  } catch (err) {
    return res.status(500).json({
      updateSuccess: false,
      message: "댓글 수정에 실패했습니다.",
    });
  }
};

const deleteComment = async (req, res) => {
  const user = req.user;
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findOne({ _id: commentId });

    //해당 댓글이 DB에 있는 댓글인지 확인
    if (!comment) {
      return res.status(404).json({
        deleteSuccess: false,
        message: "해당하는 댓글이 없습니다.",
      });
    }

    //권한이 있는 요청인지 확인
    if (user._id.toString() !== comment.commentWriterId) {
      return res.status(403).json({
        deleteSuccess: false,
        message: "권한이 없는 요청입니다.",
      });
    }

    await comment.deleteOne();

    return res.status(200).json({
      deleteSuccess: true,
      message: "댓글이 삭제되었습니다.",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      deleteSuccess: false,
      message: "댓글 삭제에 실패했습니다.",
    });
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
