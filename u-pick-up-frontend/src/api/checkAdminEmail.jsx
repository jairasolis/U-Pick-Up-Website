import axios from "axios";

export const checkEmailAvailability = async (email) => {
  try {
    const response = await axios.get(
      `https://u-pick-up-y7qnw.ondigitalocean.app/api/admin-registration/${email}`
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export default checkEmailAvailability;
