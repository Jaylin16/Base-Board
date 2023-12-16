const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const config = require("../config/key");

const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log(`${port}서버에 연결되었습니다.`);
});

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB가 연결되었습니다."))
  .catch((error) => console.log(error));

// 신규 회원가입
app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        err: err,
      });
    });
});

// 로그인
app.post("/login", async (req, res) => {
  try {
    // 요청된 이메일을 데이터베이스에서 찾는다.
    const userInfo = await User.findOne({ email: req.body.email });

    // 이메일이 없다면 메세지 발송
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "해당하는 유저가 없습니다.",
      });
    }

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인한다.
    const isMatch = await userInfo.passwordCheck(req.body.password);

    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    // 비밀번호까지 맞다면 토큰 생성.
    const userInfoWithToken = await userInfo.createToken();

    // 토큰을 저장해줌. (쿠키 방식)
    res
      .cookie("auth_cookie", userInfoWithToken.token)
      .status(200)
      .json({
        loginSuccess: true,
        message: `user: ${userInfoWithToken.nickName} 님에게 토큰이 생성되었습니다.`,
      });
  } catch (err) {
    res
      .status(500)
      .json({ loginSuccess: false, message: "로그인에 실패했습니다." });
  }
});

//인가 유저인지 여부 확인
app.get("/auth", auth, (req, res) => {
  res.status(200).json({
    userId: req.user._id,
    role: req.user.role === 0 ? "admin" : "user", //0은 고객, 1은 관리자
    email: req.user.email,
    name: req.user.name,
    nickName: req.user.nickName,
    image: req.user.image,
  });
});

//로그아웃
app.get("/logout", auth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: "" }
    );

    return res.status(200).send({
      success: true,
      message: `${user.nickName} 님 로그아웃 되었습니다.`,
    });
  } catch (err) {
    return res.json({ success: false, err });
  }
});
