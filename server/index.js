const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/key");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected...."))
  .catch((err) => console.log(err));

app.use('/api/users', require('./routes/users'))
app.use('/api/favorite', require('./routes/favorites'))

app.get("/", (req, res) => {
  res.send("안녕하세요! Web 입니다! 변경이요");
});

app.get("/api/hello", (req, res) => {
  res.send("Hello, React!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
