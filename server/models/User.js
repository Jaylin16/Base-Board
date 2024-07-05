const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const config = require("../config/key");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true, //trim으로 공백 제거
    unique: true, //중복 허용 x
    required: true, //반드시 작성해야하는 항목
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  nickName: {
    type: String,
    maxlength: 50,
    unique: true, //중복 허용 x
    required: true,
  },
  role: {
    type: Number,
    default: 0, //0은 고객, 1은 관리자
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//mongoose 기능 중 하나로 save하기 전(pre)에 특정 작업을 수행하도록 함
userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

//비밀번호 일치 여부 확인 함수
userSchema.methods.passwordCheck = async function (plainPassword) {
  try {
    const isMatched = await bcrypt.compare(plainPassword, this.password);
    return isMatched;
  } catch (err) {
    throw err;
  }
};

//토큰 생성 함수
userSchema.methods.createToken = async function () {
  try {
    const token = jwt.sign(this._id.toString(), config.secretCode);

    this.token = token;
    await this.save();

    return this;
  } catch (err) {
    throw err;
  }
};

//토큰 정보로 유저 찾는 함수
userSchema.statics.findByToken = async function (token) {
  try {
    const userId = jwt.verify(token, config.secretCode);
    const user = await User.findOne({ _id: userId, token: token });

    return user;
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
