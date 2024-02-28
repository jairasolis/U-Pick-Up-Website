import React, { useState, useEffect } from 'react';
import './Profile.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BeatLoader } from 'react-spinners';


const Profile = () => {
  const [studentsData, setStudentsData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email_ad: '',
    student_id: '', 
    gender: '',
    age: '',
    program: '',
    department: ''
  });

  const [loading, setLoading] = useState(true);


  const fetchStudentData = async (Id) => {
    try {
      const result = await axios.get(`https://u-pick-up-y7qnw.ondigitalocean.app/api/students/${Id}`);
      console.log(result.data);
  
      const {
        first_name,
        middle_name,
        last_name,
        email_ad,
        student_id,
        gender,
        age,
        program,
        department
      } = result.data.student;

      // if ('first_name' in result.student.data) {
      //   console.log(result.data.student.first_name);
      // } else {
      //   console.log('first_name property does not exist in result.student.data');
      // }
  
      setStudentsData({ 
        firstName: first_name,
        middleName: middle_name,
        lastName: last_name,
        email_ad: email_ad,
        student_id: student_id,
        gender: gender,
        age: age,
        program: program,
        department: department
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching student data:", err);
    }
  };
  
  useEffect(() => {
    const Id = localStorage.getItem('studentId');
    console.log(Id);
    if (Id) {
      fetchStudentData(Id); 
    }
  }, [localStorage.getItem('studentId')]);

  useEffect(() => {
    console.log(studentsData); // Log studentsData when it changes
  }, [studentsData]);



  return (
    <div className='profile-page'>
      <Container className="profile-container">
        <Row className="justify-content-center align-items-center" style={{ minHeight: "300px" }}>
          <Col md={12} className="text-center">
            <div className="profile-icon">
              <FontAwesomeIcon icon={ faUser } className='icon'/>
            </div>
            <div className="profile-content">
              {loading ? ( // render loader while loading is true
                <div className="spinner">
                  <BeatLoader color="#3B5534" size={15} />
                </div>
              ) : (
                <>
                  <Row>
                    <div className="name"> 
                      <h4>{studentsData.firstName} {studentsData.middleName} {studentsData.lastName}</h4>
                    </div>
                  </Row>
                  <hr className='profile-hr'/>
                  <div className="personal-details">
                    <Row>
                      <Col> <h4 className='deets'>Email:</h4> </Col>
                      <Col> <h4 className='deets'>{studentsData.email_ad}</h4></Col>
                    </Row>
                    <Row>
                      <Col><h4 className='deets'>Student ID:</h4></Col>
                      <Col><h4 className='deets'>{studentsData.student_id}</h4></Col>
                    </Row>
                    <Row>
                      <Col><h4 className='deets'>Gender:</h4></Col>
                      <Col><h4 className='deets'>{studentsData.gender}</h4></Col>
                    </Row>
                    <Row>
                      <Col><h4 className='deets'>Age:</h4></Col>
                      <Col><h4 className='deets'>{studentsData.age}</h4></Col>
                    </Row>
                  </div>
                  <hr className='profile-hr'/>
                  <div className="class-details">
                    <Row>
                      <Col><h4 className='deets'>Program:</h4></Col>
                      <Col><h4 className='deets'>{studentsData.program}</h4></Col>
                    </Row>
                    <Row>
                      <Col><h4 className='deets'>Department:</h4></Col>
                      <Col><h4 className='deets'>{studentsData.department}</h4></Col>
                    </Row>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile
