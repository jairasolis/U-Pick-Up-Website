import React, { useState, useEffect } from 'react';
import './Uniforms.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, CardBody } from 'react-bootstrap';


const Uniforms = () => {

  const [uniformData, setUniformData] = useState([]);
  const [yearLevels, setYearLevels] = useState([]);
  const [selectedYearLevel, setSelectedYearLevel] = useState('');
  const [studentsData, setStudentsData] = useState('');
  
  useEffect(() => {
    fetchYearLevels();
  }, [])

  const fetchYearLevels = async () => {
    try {
      const response = await axios.get('/year_level.json');
      console.log(response.data);
      setYearLevels(response.data);
    } catch (error) {
      console.error('Error fetching year levels:', error);
    }
  };

  const fetchStudentData = async (Id) => {
    try {
      const result = await axios.get(`https://u-pick-up-y7qnw.ondigitalocean.app/api/students/${Id}`);
      console.log(result.data);

      const program = result.data.student.program;
      console.log(program);
      fetchData(program);

      setStudentsData(program);
    } catch (err) {
      console.error("Error fetching student's program:", err);
    }
  };

  useEffect(() => {
    const Id = localStorage.getItem('studentId');
    console.log(Id);
    if (Id) {
      fetchStudentData(Id); 
    }
  }, [localStorage.getItem('studentId')]);


  const fetchData = async (course) => {
      try {
          const result = await axios.get(`https://u-pick-up-y7qnw.ondigitalocean.app/api/uniforms/${course}`);
          console.log(result.data);
          setUniformData(result.data)
      } catch (err) {
          console.log("something Wrong");
      }
  }

  const fetchSelectedData = async (course, yearLevel) => {
    try {
      const result = await axios.get(`https://u-pick-up-y7qnw.ondigitalocean.app/api/uniforms/${course}/${yearLevel}`);
      console.log(result.data);
      setUniformData(result.data);
    } catch (err) {
      console.log("Something went wrong while fetching selected data:", err);
    }
  }  
    
  const handleSubmit = () => {
    if (studentsData && selectedYearLevel) {
      fetchSelectedData(studentsData, selectedYearLevel);
    } else {
      console.log("Please select both course and year level.");
    }
  }

  const handleReset = () => {
    // Fetch all books again to reset the bookData state
    setSelectedYearLevel('');
    fetchData(studentsData);
    console.log("Uniform data reset");
  };

  return (
    <div className='uniforms-page'>
      <Card className='custom-cards'>
        <Card.Body>
            <Row className="align-items-center justify-content-center">
              <Col md={3}>
                <p className='program-text'>Program: {studentsData}</p>
              </Col>
              <Col md={3}>
                {/* <label htmlFor="yearLevelSelect">Choose a year level:</label> */}
                <select className="form-control" id="yearLevelSelect" value={selectedYearLevel} onChange={(e) => setSelectedYearLevel(e.target.value)}>
                  <option value="">Select a year level</option>
                  {yearLevels[studentsData]?.map(yearLevel => (
                    <option key={yearLevel} value={yearLevel}>{yearLevel}</option>
                  ))}
                </select>
              </Col>
              <Col>
                  <button type="submit" className="btn display-button" onClick={handleSubmit}> Display </button>
                  <button type="button" className="btn reset-button" onClick={handleReset}> Reset </button>
                </Col>
            </Row>
            <hr className="inventory-line" />
          <div className="uniforms-container">
          <div className="table-container">
            <table>
              <thead className='table-header'>
                <tr>
                  <th> ID </th>
                  <th> Uniform Type </th>
                  <th> Year Level </th>
                  <th> Course </th>
                  <th> Available </th>
                  <th className='no-border-right'> Quantity </th>
                </tr>
              </thead>
              <tbody className='uniforms'>
                {uniformData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center" style={{padding: "60px"}}>No uniforms available</td>
                  </tr>
                ) : (
                  uniformData.map((uniform, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td className='align-left'>{uniform.uniform_type}</td>
                      <td>{uniform.year_level}</td>
                      <td>{uniform.course}</td>
                      <td>{uniform.available}</td>
                      <td className='no-border-right'>{uniform.quantity}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          </div>
        </Card.Body>
      </Card>
      
    </div>
  )
}

export default Uniforms
