import React from "react";
import { useState, useEffect } from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  page,
  goToPrevPage,
  goToNextPage,
  totalPages,
  goToPage,
}) => {
  const [pages, setPages] = useState([]);

  const visiblePages = 5; // 한 번에 표시되는 페이지 수
  const halfVisible = Math.floor(visiblePages / 2);

  useEffect(() => {
    const newPages = [];
    let startPage = Math.max(page - halfVisible, 1);
    let endPage = Math.min(startPage + visiblePages - 1, totalPages);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      newPages.push(i);
    }

    setPages(newPages);
  }, [page, totalPages, halfVisible]);

  return (
    <div className={styles.PageContainer}>
      {page > 1 ? (
        <button className={styles.moveButton} onClick={goToPrevPage}>
          {"<"}
        </button>
      ) : (
        <div className={styles.space}></div>
      )}

      {pages.map((pageNum) => (
        <button
          key={pageNum}
          className={`${styles.button} ${
            page === pageNum ? styles.active : ""
          }`}
          onClick={() => goToPage(pageNum)}
        >
          {pageNum}
        </button>
      ))}

      {page < totalPages ? (
        <button className={styles.moveButton} onClick={goToNextPage}>
          {">"}
        </button>
      ) : (
        <div className={styles.space}></div>
      )}
    </div>
  );
};

export default Pagination;
