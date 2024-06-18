import { React, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import getCustomers from "../../hooks/getCustomers";
import Customer from "../../components/Customer/Customer";
import Loading from "../../components/Loading/Loading";
import AddModal from "../../components/AddModal/AddModal";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // modal
  const [addModal, setAddModal] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const minRows = 10;
  const emptyRows = minRows - customers.length;

  // fetch all customers
  const fetchData = async (page) => {
    setError(false);
    try {
      const customerData = await getCustomers(page, searchTerm);
      setCustomers(customerData.customers);
      setTotalPages(customerData.totalPages);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // 검색어 입력시 검색 함수
  const handleSearch = (event) => {
    event.preventDefault(); // 폼 submit 기본 동작 방지
    const searchValue = event.target.elements.search.value;
    setSearchTerm(searchValue); // 검색어 상태 업데이트
    setSearchParams({ page: 1, search: searchValue }); // 쿼리 파라미터 업데이트
    navigate(`/main?page=1&search=${searchValue}`); // 페이지 이동
  };

  // 지정 페이지 이동 함수
  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchParams({ page: newPage });
    navigate(`/main?page=${newPage}`);
  };

  // 이전 페이지로 이동하는 함수
  const goToPrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    navigate(`/main?page=${page - 1}`);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    navigate(`/main?page=${page + 1}`);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  // 해당 페이지로 설정 함수
  const goToPage = (newPage) => {
    setPage(newPage);
    navigate(`/main?page=${newPage}`);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchData(page);
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <>
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
              name="search"
            />
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
              <td colSpan={6}>
                <Loading />
              </td>
            </tr>
          ) : (
            <>
              {customers.map((customer, index) => (
                <Customer
                  key={customer._id}
                  page={page}
                  customer={customer}
                  fetchData={fetchData}
                  style={{
                    height: "4rem",
                    borderBottom:
                      index === customers.length - 1
                        ? "1px solid #dee2e6"
                        : "none",
                  }}
                ></Customer>
              ))}
              {emptyRows > 0 &&
                Array.from({ length: emptyRows }).map((_, index) => (
                  <tr key={`empty-${index}`} style={{ height: "4rem" }}>
                    <td
                      colSpan={6}
                      style={{
                        borderBottom:
                          index === emptyRows - 1
                            ? "1px solid #dee2e6"
                            : "none",
                      }}
                    ></td>
                  </tr>
                ))}
            </>
          )}
        </tbody>
      </table>
      <Pagination
        page={page}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        totalPages={totalPages}
        goToPage={goToPage}
      ></Pagination>
      {addModal && (
        <AddModal
          page={page}
          addModal={addModal}
          setAddModal={setAddModal}
          fetchData={fetchData}
        ></AddModal>
      )}
    </>
  );
};

export default MainPage;
