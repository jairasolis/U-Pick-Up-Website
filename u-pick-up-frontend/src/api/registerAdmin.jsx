import axios from "axios";

export const registerAdmin = async (userData) => {
  try {
    const response = await axios.post(
      "https://u-pick-up-y7qnw.ondigitalocean.app/api/admin-registration",
      userData
    );
    console.log("Response:", response.data);
    return response;
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};

export default registerAdmin;