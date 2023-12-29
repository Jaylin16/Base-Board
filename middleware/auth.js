const { User } = require("../models/User");

const auth = async (req, res, next) => {
  //클라이언트의 쿠키에서 토큰 가져오기
  const token = req.cookies.auth_cookie;

  if (!token) {
    return res.json({
      isAuth: false,
      message: "토큰이 없습니다.",
    });
  }

  //토큰 복호화로 유저 찾기
  try {
    const user = await User.findByToken(token);

    if (!user) {
      return res.json({
        isAuth: false,
        message: "가입하지 않은 회원입니다.",
      });
    } else {
      req.token = token;
      req.user = user;
      req.isAuth = true;

      next();
    }
  } catch (err) {
    return res.json({
      isAuth: false,
      message: "유효한 토큰이 아닙니다.",
      detail: `${err}`,
    });
  }
};

module.exports = { auth };
