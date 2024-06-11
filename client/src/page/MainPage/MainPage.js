import { React, useState, useEffect } from "react";
import getCustomers from "../../hooks/getCustomers";
import Customer from "../../components/Customer/Customer";
import Loading from "../../components/Loading/Loading";
import AddModal from "../../components/AddModal/AddModal";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // modal
  const [addModal, setAddModal] = useState(false);

  // fetch all customers
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <div className={styles.menuContainer}>
        <p>JH 회원 관리 시스템</p>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => {
            setAddModal(true);
          }}
        >
          신규 회원 추가
        </button>
      </div> */}
      <nav className={`navbar ${styles.navbar}`}>
        <div className="container-fluid">
          <a className={`navbar-brand ${styles["navbar-brand"]}`}>
            JH Management System
          </a>
          <form className="d-flex" role="search">
            <input
              className={`form-control me-2 ${styles["form-control"]}`}
              type="search"
              placeholder="회원이름 검색..."
              aria-label="Search"
            ></input>
            <button
              className={`btn btn-outline-success ${styles["searchBtn"]}`}
              type="submit"
            >
              Search
            </button>
            <button
              className={`btn btn-outline-secondary ${styles["addCustomerBtn"]}`}
              type="button"
              onClick={() => {
                setAddModal(true);
              }}
            >
              회원추가
            </button>
          </form>
        </div>
      </nav>
      <table className="table" style={{ textAlign: "center" }}>
        <thead className="thead-dark">
          <tr>
            <th scope="col">고객코드</th>
            <th scope="col">이름</th>
            <th scope="col">생년월일</th>
            <th scope="col">성별</th>
            <th scope="col">직업</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <th colSpan={6}>
                <Loading />
              </th>
            </tr>
          ) : (
            customers.map((customer) => (
              <Customer
                key={customer._id}
                customer={customer}
                fetchData={fetchData}
              ></Customer>
            ))
          )}
        </tbody>
      </table>
      {addModal && (
        <AddModal
          addModal={addModal}
          setAddModal={setAddModal}
          fetchData={fetchData}
        ></AddModal>
      )}
    </>
  );
};

export default MainPage;
