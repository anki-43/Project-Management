import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;

export const me = async () => {
  try {
    const response = await axios.get(API_BASE + "/user/me");
    if (response?.status) {
      return response?.data?.user;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};
