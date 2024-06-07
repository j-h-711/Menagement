import React, { useState } from "react";
import swal from "sweetalert";
import postCustomer from "./../../hooks/postCustomer";
import styles from "./AddModal.module.scss";

const AddModal = ({ addModal, setAddModal, fetchData }) => {
  // 신규교객
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    birthday: "",
    gender: "",
    job: "",
  });

  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const successAlert = (msg) => {
    swal("Success", msg, "success");
  };

  const errorAlert = (msg) => {
    swal("Fail", msg, "error");
  };

  const closeModal = () => {
    setAddModal(false);
  };

  // 회원가입
  const handleAddCustomer = async (e) => {
    e.preventDefault();

    if (newCustomer.name.length === 0) {
      errorAlert("이름을 입력해주세요!");
    } else if (
      newCustomer.birthday.length === 0 ||
      newCustomer.birthday.length < 6 ||
      newCustomer.birthday.length > 6
    ) {
      errorAlert("6자리 생년월일을 제대로 입력해주세요!");
    } else if (newCustomer.gender !== "남자" && newCustomer.gender !== "여자") {
      errorAlert("'남자' 혹은 '여자' 로 입력해주세요!");
    } else if (newCustomer.job.length <= 0) {
      errorAlert("직업을 입력해주세요!");
    } else {
      // 서버에 신규 회원 등록 라우터 위치
      try {
        await postCustomer(newCustomer);
        successAlert(`${newCustomer.name} 님이 회원 정보에 추가되었습니다.`);
        closeModal();
        console.log("Customer added successfully!");
        fetchData();
      } catch (error) {
        console.error("Error adding customer:", error);
      }
    }
  };

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h2>신규 회원 추가</h2>
            <button className={styles.close} onClick={closeModal}>
              X
            </button>
          </div>
          <form onSubmit={handleAddCustomer}>
            <div className={styles["form-group"]}>
              <p>이름</p>
              <input
                className={styles.input}
                type="text"
                name="name"
                value={newCustomer.name}
                placeholder="이름..."
                onChange={handleChange}
              />
            </div>
            <div className={styles["form-group"]}>
              <p>생년월일</p>
              <input
                className={styles.input}
                type="text"
                name="birthday"
                value={newCustomer.birthday}
                placeholder="생년월일 6자리"
                onChange={handleChange}
              />
            </div>
            <div className={styles["form-group"]}>
              <p>성별</p>
              <select
                className={styles.select}
                name="gender"
                value={newCustomer.gender}
                onChange={handleChange}
              >
                <option value="">성별을 선택하세요</option>
                <option value="남자">남자</option>
                <option value="여자">여자</option>
              </select>
            </div>
            <div className={styles["form-group"]}>
              <p>직업</p>
              <select
                className={styles.select}
                name="job"
                value={newCustomer.job}
                onChange={handleChange}
              >
                <option value="">직업을 선택하세요</option>
                <option value="직장인">직장인</option>
                <option value="자영업">자영업</option>
                <option value="학생">학생</option>
                <option value="전문직">전문직</option>
                <option value="주부">주부</option>
                <option value="무직">무직</option>
              </select>
            </div>
            <div className={styles["button-container"]}>
              <button className={styles.submit} type="submit">
                회원 추가
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddModal;
