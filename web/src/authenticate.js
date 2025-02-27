import axios from "axios";

export const me = async () => {
  try {
    const response = await axios.get("http://localhost:8081/user/me");
    if (response?.status) {
      return response?.data?.user;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};
