import axios from "axios";

const addCustomer = async (customerData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/customers/add",
      customerData
    );
    if (response?.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    throw new Error(`Error adding customer: ${error.message}`);
  }
};

export default addCustomer;
