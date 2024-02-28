import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BeatLoader } from 'react-spinners';

const Profile = () => {
  const [adminData, setAdminData] = useState({
    username: '',
    email_ad: '',
    department: ''
  });
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async (Id) => {
    try {
      const result = await axios.get(`https://u-pick-up-y7qnw.ondigitalocean.app/api/admins/${Id}`);
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
      setLoading(false); // Set loading state to false after data is fetched
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  useEffect(() => {
    const Id = localStorage.getItem('adminId');
    if (Id) {
      fetchAdminData(Id); 
    }
  }, [localStorage.getItem('adminId')]);

  return (
    <div className='profile-page'>
      <Container className="profile-container">
        <Row className="justify-content-center align-items-center" style={{ minHeight: "300px" }}>
          <Col md={12} className="text-center">
            {loading ? ( // render loader while loading is true
              <div className="spinner">
                <BeatLoader color="#3B5534" size={15} />
              </div>
            ) : (
              <div className="profile-content">
                <div className="profile-icon">
                  <FontAwesomeIcon icon={faUser} className='icon'/>
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
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile;
