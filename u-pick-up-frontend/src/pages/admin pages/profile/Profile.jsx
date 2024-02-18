import React from 'react'
import './Profile.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Profile = () => {

  const [adminData, setAdminData] = useState({
    username: '',
    email_ad: '',
    department: ''
  });


  const fetchAdminData = async (Id) => {
    try {
      const result = await axios.get(`https://u-pick-up-y7qnw.ondigitalocean.app/api/admins/${Id}`);
      console.log(result.data);
  
      const {
        username,
        email_ad,
        department
      } = result.data.admin;

      setAdminData({ 
        username: username,
        email_ad: email_ad,
        department: department
      });
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  useEffect(() => {
    const Id = localStorage.getItem('adminId');
    console.log(Id);
    if (Id) {
      fetchAdminData(Id); 
    }
  }, [localStorage.getItem('adminId')]);

  useEffect(() => {
    console.log(adminData); // Log adminData when it changes
  }, [adminData]);

  
  return (
    <div className='profile-page'>
      <div className="profile-container">
        <div className="profile-icon">
          <FontAwesomeIcon icon={ faUser } className='icon'/>
        </div>
        <div className="profile-content">
          <div className="name"> 
            <h4> Admin </h4>
          </div>
          <hr className='profile-hr'/>
          <div className="class-details">
            <h4>Email: </h4>
            <h4>Department: </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
