import axios from "axios";

export const fetchStudentData = async (Id) => {
    try {
      const result = await axios.get(`https://u-pick-up-y7qnw.ondigitalocean.app/api/students/${Id}`);
      console.log(result.data);
      return
    } catch (err) {
      console.error("Error fetching student data:", err); // Log the actual error
  }
}

export default fetchStudentData;