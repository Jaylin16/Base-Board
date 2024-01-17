const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const config = require("../config/key");

const { loginController } = require("../controllers/loginController");
const { boardController } = require("../controllers/boardController");

app.listen(port, () => {
  console.log(`${port}서버에 연결되었습니다.`);
});

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB가 연결되었습니다."))
  .catch((error) => console.log(error));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/", loginController);
app.use("/board", boardController);

app.get("/hello", (req, res) => {
  return res.send("Hello");
});
