import axios from "axios";

const postLogin = async (username, password) => {
  console.log(username, password);
  try {
    const response = await axios.post("http://localhost:5000/api/login", {
      username,
      password,
    });

    if (response?.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    throw new Error(`Error to login: ${error.message}`);
  }
};

export default postLogin;
