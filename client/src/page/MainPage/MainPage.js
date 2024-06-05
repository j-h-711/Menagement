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

  // 모달 관리 상태
  const [addModal, setAddModal] = useState(false);

  // 전체 회원 조회
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

  // 회원 추가 모달 닫는 함수
  const closeModal = () => {
    setAddModal(false);
  };

  const handleAdd = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.menuContainer}>
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
      </div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">고객코드</th>
            <th scope="col">이름</th>
            <th scope="col">생년월일</th>
            <th scope="col">생년월일</th>
            <th scope="col">직업</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <th colSpan={6} className="text-center">
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
          handleAddCustomer={handleAdd}
        ></AddModal>
      )}
    </>
  );
};

export default MainPage;
