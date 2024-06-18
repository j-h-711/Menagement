import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import swal from "sweetalert";
import patchCustomer from "../../hooks/patchCustomer";
import styles from "./EditModal.module.scss";

const EditModal = ({ customer, editModal, setEditModal, fetchData, page }) => {
  // edit customer state
  const [editCustomer, setEditCustomer] = useState({
    name: customer.name,
    birthday: customer.birthday,
    gender: customer.gender,
    job: customer.job,
    phone: customer.phone,
    address: customer.address,
    etc: customer.etc,
  });

  const [showPostcode, setShowPostcode] = useState(false);

  const handleChange = (e) => {
    setEditCustomer({ ...editCustomer, [e.target.name]: e.target.value });
  };

  const handleSearchAddress = () => {
    setShowPostcode(true);
  };

  const handleComplete = (data) => {
    let addr = ""; // 주소 변수
    let extraAddr = ""; // 참고항목 변수

    if (data.userSelectedType === "R") {
      addr = data.roadAddress;
    } else {
      addr = data.jibunAddress;
    }

    if (data.userSelectedType === "R") {
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraAddr +=
          extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }
      if (extraAddr !== "") {
        addr += " (" + extraAddr + ")";
      }
    }

    setEditCustomer({ ...editCustomer, address: addr });
    setShowPostcode(false);
  };

  const successAlert = (msg) => {
    swal("Success", msg, "success");
  };

  const errorAlert = (msg) => {
    swal("Fail", msg, "error");
  };

  const closeModal = () => {
    setEditModal(false);
  };

  const closePostcodeModal = () => {
    setShowPostcode(false);
  };

  // 회원가입
  const handleAddCustomer = async (e) => {
    e.preventDefault();

    if (editCustomer.name.length === 0) {
      errorAlert("이름을 입력해주세요!");
    } else if (
      editCustomer.birthday.length === 0 ||
      editCustomer.birthday.length < 6 ||
      editCustomer.birthday.length > 6
    ) {
      errorAlert("6자리 생년월일을 제대로 입력해주세요!");
    } else if (editCustomer.phone.length !== 11) {
      errorAlert("연락처를 제대로 입력해주세요.");
    } else if (editCustomer.address.length < 1) {
      errorAlert("주소를 제대로 입력해주세요.");
    } else if (
      editCustomer.gender !== "남자" &&
      editCustomer.gender !== "여자"
    ) {
      errorAlert("'남자' 혹은 '여자' 로 입력해주세요!");
    } else if (editCustomer.job.length <= 0) {
      errorAlert("직업을 입력해주세요!");
    } else {
      // 서버에 신규 회원 등록 라우터 위치
      try {
        await patchCustomer(customer._id, editCustomer);
        successAlert(`${editCustomer.name} 님의 회원 정보가 수정되었습니다.`);
        closeModal();
        console.log("Customer updated successfully!");
        fetchData(page);
      } catch (error) {
        console.error("Error updating customer:", error);
      }
    }
  };

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h2>회원 정보 수정</h2>
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
                value={editCustomer.name}
                placeholder="이름 입력"
                onChange={handleChange}
              />
            </div>
            <div className={styles["form-group"]}>
              <p>생년월일</p>
              <input
                className={styles.input}
                type="text"
                name="birthday"
                value={editCustomer.birthday}
                placeholder="6자리 생년월일 입력"
                onChange={handleChange}
              />
            </div>
            <div className={styles["form-group"]}>
              <p>연락처</p>
              <input
                className={styles.input}
                type="text"
                name="phone"
                value={editCustomer.phone}
                placeholder="- 없이 입력..."
                onChange={handleChange}
              />
            </div>
            <div className={styles["form-group"]}>
              <p>주소</p>
              <input
                className={styles.addressInput}
                type="text"
                name="address"
                value={editCustomer.address}
                placeholder="주소 입력..."
                onChange={handleChange}
              />
              <button
                className={styles.search}
                type="button"
                onClick={handleSearchAddress}
              >
                검색
              </button>
            </div>
            <div className={styles["form-group"]}>
              <p>성별</p>
              <select
                className={styles.select}
                name="gender"
                value={editCustomer.gender}
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
                value={editCustomer.job}
                onChange={handleChange}
              >
                <option value="">직업을 선택하세요</option>
                <option value="직장인">직장인</option>
                <option value="자영업">자영업</option>
                <option value="전문직">전문직</option>
                <option value="공무원">공무원</option>
                <option value="학생">학생</option>
                <option value="주부">주부</option>
                <option value="무직">무직</option>
              </select>
            </div>
            <div className={styles["form-group"]}>
              <p>비고</p>
              <textarea
                className={styles.etcArea}
                name="etc"
                value={editCustomer.etc}
                placeholder="기타 정보..."
                onChange={handleChange}
              />
            </div>
            <div className={styles["button-container"]}>
              <button className={styles.submit} type="submit">
                정보 수정
              </button>
            </div>
          </form>
        </div>
      </div>
      {showPostcode && (
        <div
          className={styles["postcode-overlay"]}
          onClick={closePostcodeModal}
        >
          <div
            className={styles["postcode-modal"]}
            onClick={(e) => e.stopPropagation()}
          >
            <DaumPostcode onComplete={handleComplete} />
            <button className={styles.modalClose} onClick={closePostcodeModal}>
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
