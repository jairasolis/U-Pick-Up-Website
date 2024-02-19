import React, { useState, useEffect } from 'react';
import './Books.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, CardBody } from 'react-bootstrap';

const Books = () => {

  const [bookData, setBookData] = useState([]);
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
          const result = await axios("https://u-pick-up-y7qnw.ondigitalocean.app/api/books");
          console.log(result.data.results);
          setBookData(result.data.results)
      } catch (err) {
          console.log("something Wrong");
      }
  }

  const fetchSelectedData = async (course, yearLevel) => {
    try {
      const result = await axios.get(`https://u-pick-up-y7qnw.ondigitalocean.app/api/books/${course}/${yearLevel}`);
      console.log(result.data);
      setBookData(result.data);
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
  <div className='books-page'>
    <Card className='custom-cards'>
      <Card.Body>        
        <Container>
          <Row className='align-items-center justify-content-center'>
            <Col md={3}> 
              <label htmlFor="courseSelect">Choose a course:</label>
              <select className="form-control" id="courseSelect" onChange={(e) => setSelectedCourse(e.target.value)}>
                <option value="">Select a course</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </Col>
            <Col md={3}>
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
            <Col md={2}>
              <button type="submit" className="btn display-button" onClick={handleSubmit}> Display </button>
            </Col>
            <Col md={2}>
              <button type="button" className="btn reset-button" onClick={handleReset}> Reset </button>
            </Col>
          </Row>
          <hr className='inventory-line' />
        </Container>

        <div className="books-container">
          <table>
            <thead className='table-header'>
              <tr>
                <th> ID </th>
                <th> Subject name </th>
                <th> Year Level </th>
                <th> Course </th>
                <th> Available </th>
                <th> Quantity </th>
              </tr>
            </thead>
            <tbody className='books'>
              {bookData.map((book, i) => {
                console.log("Book data:", bookData);
                return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{book.subject_name} </td>
                      <td>{book.year_level} </td>
                      <td>{book.course} </td>
                      <td>{book.available} </td>
                      <td>{book.quantity} </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );

}

export default Books
