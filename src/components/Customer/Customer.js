import React from "react";
import { TableRow, TableCell } from "@mui/material";

export const Customer = ({ customer }) => {
  return (
    <>
      <TableRow>
        <TableCell>{customer.id}</TableCell>
        <TableCell>
          <img src={customer.image} alt="profile"></img>
        </TableCell>
        <TableCell>{customer.name}</TableCell>
        <TableCell>{customer.birthday}</TableCell>
        <TableCell>{customer.gender}</TableCell>
        <TableCell>{customer.job}</TableCell>
      </TableRow>
    </>
  );
};

export default Customer;
