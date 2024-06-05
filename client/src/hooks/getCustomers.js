import axios from "axios";

const getCustomers = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/customers");
    // loading 컴포넌트 확인 시간지연
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (response?.data) return response.data;
  } catch (error) {
    throw new Error(`Error fetching customers: ${error.message}`);
  }
};

export default getCustomers;
