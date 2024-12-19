import axios from "axios";
import { useNavigate } from "react-router-dom";

export const me = async () => {
  const navigate = useNavigate();
  try {
    const response = await axios.get("http://localhost:8081/user/me");
    if (response?.status) {
      return response?.user;
    } else {
      navigate("/");
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};
