const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const router = express.Router();
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 라우터
const customerRouter = require("./src/customers/router");
const loginRouter = require("./src/admin/router");

// MongoDB 연결 설정
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// 라우터 사용
app.use("/api/customers", customerRouter);
app.use("/api/login", loginRouter);

app.listen(port, () => {
  console.log(`Server is Listening on ${port}`);
});
