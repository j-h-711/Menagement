const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  console.log(res);
  res.send([
    {
      id: 1,
      image: "https://picsum.photos/64/64?random=1",
      name: "홍길동",
      birthday: "950711",
      gender: "남자",
      job: "대학생",
    },
    {
      id: 2,
      image: "https://picsum.photos/64/64?random=2",
      name: "이지형",
      birthday: "940221",
      gender: "남자",
      job: "직장인",
    },
    {
      id: 3,
      image: "https://picsum.photos/64/64?random=3",
      name: "김짱구",
      birthday: "990512",
      gender: "여자",
      job: "대학생",
    },
    {
      id: 4,
      image: "https://picsum.photos/64/64?random=4",
      name: "박진영",
      birthday: "911211",
      gender: "남자",
      job: "대학생",
    },
    {
      id: 5,
      image: "https://picsum.photos/64/64?random=5",
      name: "윤석열",
      birthday: "881121",
      gender: "남자",
      job: "직장인",
    },
    {
      id: 6,
      image: "https://picsum.photos/64/64?random=6",
      name: "이재명",
      birthday: "800923",
      gender: "남자",
      job: "정치인",
    },
    {
      id: 7,
      image: "https://picsum.photos/64/64?random=7",
      name: "심상정",
      birthday: "010217",
      gender: "여자",
      job: "무직",
    },
    {
      id: 8,
      image: "https://picsum.photos/64/64?random=8",
      name: "김제니",
      birthday: "030415",
      gender: "여자",
      job: "변호사",
    },
    {
      id: 9,
      image: "https://picsum.photos/64/64?random=9",
      name: "이준석",
      birthday: "900218",
      gender: "남자",
      job: "공무원",
    },
  ]);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
