import axios from "axios";

export const loginAdmin = async (userData) => {
    try {
      const response = await axios.post(
        "https://u-pick-up-y7qnw.ondigitalocean.app/api/admin-login",
        userData
      );
      console.log("Response:", response.data);
      return response;
    } catch (error) {
      console.error("Registration Error:", error);
      throw error;
    }
  };
  
export default loginAdmin;