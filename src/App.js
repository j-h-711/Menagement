import React from "react";
import Customer from "./components/Customer/Customer";

function App() {
  const customers = [
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
  ];

  return (
    <>
      {customers.map((customer) => (
        <Customer key={customer.id} customer={customer}></Customer>
      ))}
    </>
  );
}

export default App;
