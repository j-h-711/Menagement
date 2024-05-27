import React from "react";
import Customer from "./components/Customer/Customer";
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  createTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 50,
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
}));

function App() {
  const classes = useStyles();
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
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <Customer key={customer.id} customer={customer}></Customer>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default App;
