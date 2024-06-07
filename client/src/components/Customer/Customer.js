import React, { useState } from "react";
import styles from "./Customer.module.scss";
import deleteCustomer from "../../hooks/deleteCustomer";
import TrLoading from "../TrLoading/TrLoading";
import EditModal from "../EditModal/EditModal";

export const Customer = ({ customer, fetchData }) => {
  const [loading, setLoading] = useState(false);

  const [editModal, setEditModal] = useState(false);

  // delete customer
  const handleDeleteCustomer = async () => {
    setLoading(true);
    try {
      await deleteCustomer(customer._id);
      await fetchData();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditModal = () => {
    setEditModal(true);
  };

  return (
    <>
      {loading ? (
        <tr>
          <td colSpan="6">
            <TrLoading></TrLoading>
          </td>
        </tr>
      ) : (
        <tr>
          <th scope="row" style={{ width: "25%", verticalAlign: "middle" }}>
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
          <td
            className={styles.buttons}
            style={{ width: "15%", verticalAlign: "middle" }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleEditModal}
            >
              수정
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleDeleteCustomer}
            >
              삭제
            </button>
          </td>
        </tr>
      )}
      {editModal && (
        <EditModal
          customer={customer}
          editModal={editModal}
          setEditModal={setEditModal}
          fetchData={fetchData}
        ></EditModal>
      )}
    </>
  );
};

export default Customer;
