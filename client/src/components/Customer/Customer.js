import React from "react";
import styles from "./Customer.module.scss";

export const Customer = ({ customer }) => {
  return (
    <>
      <tr>
        <th scope="row" style={{ width: "30%", verticalAlign: "middle" }}>
          {customer._id}
        </th>
        <td style={{ width: "15%", verticalAlign: "middle" }}>
          {customer.name}
        </td>
        <td style={{ width: "15%", verticalAlign: "middle" }}>
          {customer.birthday}
        </td>
        <td style={{ width: "15%", verticalAlign: "middle" }}>
          {customer.gender}
        </td>
        <td style={{ width: "15%", verticalAlign: "middle" }}>
          {customer.job}
        </td>
        <td style={{ width: "10%", verticalAlign: "middle" }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: "100px" }}
          >
            수정/삭제
          </button>
        </td>
      </tr>
    </>
  );
};

export default Customer;
