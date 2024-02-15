import axios from "axios";

export const checkIdAvailability = async (idNumber) => {
  try {
    const response = await axios.get(
      `https://u-pick-up-y7qnw.ondigitalocean.app/api/student-registration/${idNumber}`
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export default checkIdAvailability;
