const express = require("express");
const loginService = require("../service/loginService");

const { auth } = require("../middleware/auth");

const loginController = express.Router();

//신규 회원가입
loginController.post("/signup", loginService.createUser);

//로그인
loginController.post("/login", loginService.userLogin);

//인가 유저인지 여부 확인
loginController.get("/auth", auth, loginService.checkAuth);

//로그아웃
loginController.post("/logout", auth, loginService.userLogout);

module.exports = { loginController };
