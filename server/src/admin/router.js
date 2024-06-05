const express = require("express");
const router = express.Router();
const Admin = require("./model/admin.schema");

// 관리자 로그인
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    // 입력된 username에 해당하는 사용자를 찾음
    const admin = await Admin.findOne({ username });

    // 사용자가 없거나 비밀번호가 일치하지 않으면 로그인 실패
    if (!admin || admin.password !== password) {
      res.status(401).json({ message: "관리자 로그인 실패 (비밀번호 불일치)" });
    } else {
      // 로그인 성공
      res.status(200).json({ message: "관리자 로그인 성공" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
