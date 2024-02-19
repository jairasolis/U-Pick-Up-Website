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
  const [courses, setCourses] = useState([]);
  const [yearLevels, setYearLevels] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('');
  
  useEffect(() => {
      fetchData();
      fetchCourses();
      fetchYearLevels();
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/courses.json');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchYearLevels = async () => {
    try {
      const response = await axios.get('/year_level.json');
      setYearLevels(response.data);
    } catch (error) {
      console.error('Error fetching year levels:', error);
    }
  };

  const fetchData = async () => {
      try {
          const result = await axios("https://u-pick-up-y7qnw.ondigitalocean.app/api/modules");
          console.log(result.data.results);
          setModulesData(result.data.results)
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
    if (selectedCourse && selectedYearLevel) {
      fetchSelectedData(selectedCourse, selectedYearLevel);
    } else {
      console.log("Please select both course and year level.");
    }
  }

  const handleReset = () => {
    // Fetch all books again to reset the bookData state
    fetchData();
    console.log("Book data reset");
  };

  return (
    <div className='modules-page'>
      <Card className='custom-cards'>
        <CardBody>
          <Container>
            <Row>
              <Col> 
                <label htmlFor="courseSelect">Choose a course:</label>
                <select className="form-control" id="courseSelect" onChange={(e) => setSelectedCourse(e.target.value)}>
                  <option value="">Select a course</option>
                  {courses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </Col>
              <Col>
                  <div>
                    <label htmlFor="yearLevelSelect">Choose a year level:</label>
                    <select className="form-control" id="yearLevelSelect" onChange={(e) => setSelectedYearLevel(e.target.value)}>
                      <option value="">Select a year level</option>
                      {yearLevels[selectedCourse]?.map(yearLevel => (
                        <option key={yearLevel} value={yearLevel}>{yearLevel}</option>
                      ))}
                    </select>
                  </div>
              </Col>
              <Col>
                  <button type="submit" className="btn display-button" onClick={handleSubmit}> Display </button>
                </Col>
                <Col>
                  <button type="button" className="btn reset-button" onClick={handleReset}> Reset </button>
                </Col>
            </Row>
            <hr className='inventory-line' />

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
                {
                  modulesData.map((modules, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{modules.subject_code} </td>
                            <td className='align-left'>{modules.subject_name} </td>
                            <td>{modules.year_level} </td>
                            <td>{modules.course} </td>
                            <td>{modules.available} </td>
                            <td>{modules.quantity} </td>
                        </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
      
    </div>
  )
}

export default Modules
