import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import postLogin from "../../hooks/postLogin";
import swal from "sweetalert";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    const name = e.target.value;
    setUsername(name);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  // login form reset
  const resetForm = () => {
    setUsername("");
    setPassword("");
  };

  const successAlert = (msg) => {
    swal("Success", msg, "success");
  };

  const errorAlert = (msg) => {
    swal("Fail", msg, "error");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await postLogin(username, password);
      successAlert("관리자님, 환영합니다.");
      navigate("/main");
    } catch (error) {
      errorAlert("아이디&비밀번호를 정확하게 입력해주세요.");
      resetForm();
    }
  };

  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.loginContainer}>
          <h3>회원 관리 시스템</h3>
          <form onSubmit={handleLogin}>
            <div className={styles.formElement}>
              <p>Admin id</p>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleNameChange}
              />
            </div>
            <div className={styles.formElement}>
              <p>password</p>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button className={styles.submitBtn} type="submit">
              로그인
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HomePage;
