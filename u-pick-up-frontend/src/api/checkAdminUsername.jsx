import axios from "axios";

export const checkUsernameAvailability = async (username) => {
  try {
    const response = await axios.get(
      `https://u-pick-up-y7qnw.ondigitalocean.app/api/admin-registration/${username}`
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export default checkUsernameAvailability;
