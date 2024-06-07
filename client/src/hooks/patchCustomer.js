import axios from "axios";

const patchCustomer = async (customerId, customerData) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/customers/patch/${customerId}`,
      customerData
    );
    if (response?.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    throw new Error(`Error updating customer: ${error.message}`);
  }
};

export default patchCustomer;
