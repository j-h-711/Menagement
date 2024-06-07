import axios from "axios";

const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(
      "http://localhost:5000/api/customers/delete",
      { data: { id } }
    );
    if (response?.data) {
      // console.log(response.data);
      return response.data;
    }
  } catch (error) {
    throw new Error(`Error to delete customer : ${error.message}`);
  }
};

export default deleteCustomer;
