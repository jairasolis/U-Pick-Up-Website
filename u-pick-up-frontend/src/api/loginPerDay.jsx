import axios from "axios";

export const insertLoginActivity = async (studentId) => {
    try {
      const response = await axios.post(
        "https://u-pick-up-y7qnw.ondigitalocean.app/api/dashboard/insert-login-data",
        { id: studentId }
      );
      console.log("Response:", response.data);
      return response;
    } catch (error) {
      console.error("Registration Error:", error);
      throw error;
    }
};

export default insertLoginActivity;