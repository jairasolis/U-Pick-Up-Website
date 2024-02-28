import React, { useState, useEffect } from 'react';
import './Modules.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, CardBody } from 'react-bootstrap';


const Modules = () => {

  const [modulesData, setModulesData] = useState([]);
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
          const result = await axios.get(`https://u-pick-up-y7qnw.ondigitalocean.app/api/modules/${course}`);
          console.log(result.data);
          setModulesData(result.data)
      } catch (err) {
          console.log("something Wrong");
      }
  }

  const fetchSelectedData = async (course, yearLevel) => {
    try {
      const result = await axios.get(`https://u-pick-up-y7qnw.ondigitalocean.app/api/modules/${course}/${yearLevel}`);
      console.log(result.data);
      setModulesData(result.data);
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
    console.log("Modules data reset");
  };


  return (
    <div className='modules-page'>
      <Card className='custom-cards'>
        <CardBody>
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col md={3}>
              <p>Program: {studentsData}</p>
            </Col>
            <Col md={3}>
              <label htmlFor="yearLevelSelect">Choose a year level:</label>
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
          </Container>
          <div className="modules-container">
            <table>
              <thead className='table-header'>
                <tr>
                  <th> ID </th>
                  <th> Subject code </th>
                  <th> Subject name </th>
                  <th> Year Level </th>
                  <th> Course </th>
                  <th> Available </th>
                  <th> Quantity </th>
                </tr>
              </thead>
              <tbody className='modules'>
                {modulesData.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{padding: "60px"}}>No modules available</td>
                  </tr>
                ) : (
                  modulesData.map((module, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{module.subject_code}</td>
                      <td className='align-left'>{module.subject_name}</td>
                      <td>{module.year_level}</td>
                      <td>{module.course}</td>
                      <td>{module.available}</td>
                      <td>{module.quantity}</td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </CardBody>
      </Card>
      
    </div>
  )
}

export default Modules
