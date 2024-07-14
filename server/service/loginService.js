const { User } = require("../models/User");

//신규 회원 생성
const createUser = async (req, res) => {
  const { email, nickName } = req.body;

  const emailExist = await User.findOne({ email });
  const nickNameExist = await User.findOne({ nickName });

  const error = {};
  if (!!emailExist || !!nickNameExist) {
    if (!!emailExist) {
      error.email = "중복된 이메일 입니다.";
    }

    if (!!nickNameExist) {
      error.nickName = "중복된 닉네임 입니다.";
    }

    return res.status(400).json({
      registerSuccess: false,
      err: error,
    });
  }

  const user = new User(req.body);

  await user
    .save()
    .then(() => {
      res.status(200).json({
        registerSuccess: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        registerSuccess: false,
        err: err,
      });
    });
};

//로그인
const userLogin = async (req, res) => {
  try {
    // 요청된 이메일을 데이터베이스에서 찾는다.
    const userInfo = await User.findOne({ email: req.body.email });

    // 이메일이 없다면 메세지 발송
    if (!userInfo) {
      return res.status(400).json({
        loginSuccess: false,
        message: "해당하는 유저가 없습니다.",
      });
    }

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인한다.
    const isMatch = await userInfo.passwordCheck(req.body.password);

    if (!isMatch) {
      return res.status(400).json({
        loginSuccess: false,
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    // 비밀번호까지 맞다면 토큰 생성.
    const userInfoWithToken = await userInfo.createToken();

    const cookieOptions = {
      httpOnly: true, //활성화시 JS에서 document.cookie 접근 불가.
      maxAge: 1000 * 60 * 60 * 24, //1일
      // maxAge: 1000 * 60 * 5, //5분
      secure: process.env.NODE_ENV === "production", //  Https 사이트에서 설정한 쿠키만 엑세스 가능
      sameSite: process.env.NODE_ENV === "production" ? "None" : "", // Cross-Site 요청에서 쿠키를 허용
      path: "/",
    };

    // 토큰을 저장해줌. (쿠키 방식)
    res
      .cookie("auth_cookie", userInfoWithToken.token, cookieOptions)
      .status(200)
      .json({
        loginSuccess: true,
        userId: `${userInfoWithToken._id.toString()}`,
        userName: `${userInfoWithToken.nickName}`,
      });
  } catch (err) {
    res.json({ loginSuccess: false, message: "로그인에 실패했습니다." });
  }
};

//인가 유저 여부 판별
const checkAuth = (req, res) => {
  res.status(200).json({
    userId: req.user._id,
    role: req.user.role === 0 ? "user" : "admin", //0은 고객, 1은 관리자
    email: req.user.email,
    nickName: req.user.nickName,
    image: req.user.image,
    isAuth: req.isAuth,
  });
};

//로그아웃
const userLogout = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: "" }
    );

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production", //  Https 사이트에서 설정한 쿠키만 엑세스 가능
      sameSite: process.env.NODE_ENV === "production" ? "None" : "", // Cross-Site 요청에서 쿠키를 허용
    };

    return res
      .cookie("auth_cookie", "", cookieOptions)
      .status(200)
      .send({
        success: true,
        message: `${user.nickName} 님 로그아웃 되었습니다.`,
      });
  } catch (err) {
    return res.json({ success: false, err });
  }
};

module.exports = { createUser, userLogin, checkAuth, userLogout };
