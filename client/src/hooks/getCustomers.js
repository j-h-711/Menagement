import axios from "axios";

const getCustomers = async (page, searchTerm = "") => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/customers?page=${page}&limit=10&search=${encodeURIComponent(
        searchTerm
      )}`
    );
    // loading 컴포넌트 확인 시간지연
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (response?.data) return response.data;
  } catch (error) {
    throw new Error(`고객 데이터를 가져오는 중 오류 발생: ${error.message}`);
  }
};

export default getCustomers;
