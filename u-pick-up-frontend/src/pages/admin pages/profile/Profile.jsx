import React, { useState, useEffect } from 'react';
import './Profile.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      <Container className="profile-container">
        <div className="profile-icon">
          <FontAwesomeIcon icon={ faUser } className='icon'/>
        </div>
        <div className="profile-content">
          <Row className='name'>
              <h4> {adminData.username}</h4>
          </Row>
          <hr className='profile-hr'/>
          <Row>
            <div className="class-details">
              <Row> 
                <Col> <h4 className='deets'> Email: </h4> </Col>
                <Col> <h4 className='deets'> {adminData.email_ad} </h4> </Col>
              </Row>
              <Row> 
                <Col> <h4 className='deets'> Department: </h4> </Col>
                <Col> <h4 className='deets'> {adminData.department} </h4> </Col>
              </Row>
            </div>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default Profile
