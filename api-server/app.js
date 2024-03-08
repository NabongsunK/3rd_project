var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use("/api", indexRouter);

// 404 에러 처리
app.use((req, res, next) => {
  console.error(404, req.url);
  res.json({ error: { message: "존재하지 않는 API입니다." } });
});

// 500 에러 처리
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.error(err.cause);
  res.json({
    error: { message: "요청을 처리할 수 없습니다. 잠시 후 다시 요청해주세요." },
  });
});

module.exports = app;
