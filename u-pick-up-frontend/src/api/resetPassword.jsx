import axios from 'axios';

const resetPassword = async (newPassword) => {
  try {
    const response = await axios.post('https://u-pick-up-y7qnw.ondigitalocean.app/api/reset-password', 
        newPassword
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default resetPassword;
