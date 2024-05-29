import { React, useState, useEffect } from "react";
import getCustomers from "./hooks/getCustomers";
import Customer from "./components/Customer/Customer";
import Loading from "./components/Loading/Loading";
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

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerData = await getCustomers();
        setCustomers(customerData);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Loading />
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <Customer key={customer.id} customer={customer}></Customer>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default App;
