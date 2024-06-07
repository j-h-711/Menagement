import * as React from "react";
import styles from "./TrLoading.module.scss";

const TrLoading = () => {
  return (
    <>
      <div className={styles.loading}>
        <div className="spinner-border text-secondary" role="status"></div>
      </div>
    </>
  );
};

export default TrLoading;
