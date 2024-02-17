import axios from "axios";

export const sendResetPassEmail = async (email) => {
  try {
    const response = await axios.post(
      "https://u-pick-up-y7qnw.ondigitalocean.app/api/forgot-password",
      email
    );
    console.log("Response:", response.data);
    return response;
  } catch (error) {
    console.error("Send Error:", error);
    throw error;
  }
};

export default sendResetPassEmail;
