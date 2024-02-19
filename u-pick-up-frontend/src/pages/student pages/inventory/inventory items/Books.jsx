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
          const result = await axios.get(`https://u-pick-up-y7qnw.ondigitalocean.app/api/books/${course}`);
          console.log(result.data);
          setBookData(result.data)
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
    if (studentsData && selectedYearLevel) {
      fetchSelectedData(studentsData, selectedYearLevel);
    } else {
      console.log("Please select both course and year level.");
    }
  }

  const handleReset = () => {
    // Fetch all books again to reset the bookData state
    fetchData(studentsData);
    console.log("Book data reset");
  };


  return (
    <div className="books-page">
      <Card className="custom-cards">
        <Card.Body>
          <Container>
            <Row className="align-items-center justify-content-center">
              <Col md={3}>
                <p>Program: {studentsData}</p>
              </Col>
              <Col md={3}>
                <label htmlFor="yearLevelSelect">Choose a year level:</label>
                <select className="form-control" id="yearLevelSelect" onChange={(e) => setSelectedYearLevel(e.target.value)}>
                  <option value="">Select a year level</option>
                  {yearLevels[studentsData]?.map(yearLevel => (
                    <option key={yearLevel} value={yearLevel}>{yearLevel}</option>
                  ))}
                </select>
              </Col>
              <Col>
                  <button type="submit" className="btn display-button" onClick={handleSubmit}> Display </button>
                </Col>
                <Col>
                  <button type="button" className="btn reset-button" onClick={handleReset}> Reset </button>
                </Col>
            </Row>
            <hr className="inventory-line" />
          </Container>

          <div className="books-container">
            <table>
              <thead className="table-header">
                <tr>
                  <th>ID</th>
                  <th>Subject name</th>
                  <th>Year Level</th>
                  <th>Program</th>
                  <th>Available</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody className="books">
                {bookData.length === 0 ? (
                  <tr>
                    <td colSpan="6">No stocks of books available</td>
                  </tr>
                ) : (
                  bookData.map((book, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{book.subject_name}</td>
                      <td>{book.year_level}</td>
                      <td>{book.course}</td>
                      <td>{book.available}</td>
                      <td>{book.quantity}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};


export default Books
