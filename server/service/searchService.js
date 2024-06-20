const { Board } = require("../models/Board");

const searchTitle = async (req, res) => {
  try {
    const { keyword } = req.query;

    const regex = new RegExp(`.*${keyword}.*`, "i"); //i 옵션으로 대소문자 구분 없음.

    const result = await Board.find({
      boardTitle: regex,
    });

    res.status(200).json({
      result: result,
      message: "요청하신 검색에 성공했습니다.",
    });
  } catch (err) {
    res.status(500).json({
      message: "요청하신 검색에 실패했습니다.",
    });

    console.log("err====>", err);
  }
};

module.exports = { searchTitle };
