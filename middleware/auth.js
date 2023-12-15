const { User } = require("../models/User");

const auth = (req, res, next) => {
  //클라이언트의 쿠키에서 토큰 가져오기
  const token = req.cookies.auth_cookie;

  if (!token) {
    return res.status(400).json({
      isAuth: false,
      message: "토큰이 없습니다. 다시 로그인 해주세요.",
    });
  }

  //토큰 복호화로 유저 찾기
  const user = User.findByToken(token);

  if (!user) {
    return res.json({
      isAuth: false,
      message: "해당 유저가 없습니다.",
    });
  } else {
    req.token = token;
    req.user = user;

    next();
  }
};

module.exports = { auth };
