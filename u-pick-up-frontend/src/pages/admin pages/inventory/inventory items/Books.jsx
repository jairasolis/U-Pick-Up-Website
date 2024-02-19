import React, { useState, useEffect } from 'react';
import './Books.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, CardBody, Modal } from 'react-bootstrap';
import AddBookPage from './AddBookPage';

const Books = () => {

  const [bookData, setBookData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [yearLevels, setYearLevels] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('');
  const [showAddBookPage, setShowAddBookPage] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);

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
    // Fetch all books again to show all the bookData state
    fetchData();
    console.log("Book data reset");
  };

  const handleAdd = () => {
    setShowAddBookPage(true);
  };

  const handleCancelAdd = () => {
    setShowAddBookPage(false);
  };

  const handleEdit = async (id) => {
    try {
      // Fetch the details of the book to be edited
      const response = await axios.get(`https://u-pick-up-y7qnw.ondigitalocean.app/api/books-update/${id}`);
      // Populate a form with the retrieved book details
      setEditFormData(response.data);
      // Set the ID of the book to be edited in state
      setEditBookId(id);
      // Open the edit modal or navigate to the edit page
    } catch (error) {
      console.error("Error fetching book details for edit:", error);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
        await axios.delete(`https://u-pick-up-y7qnw.ondigitalocean.app/api/booksdelete/${id}`);
        const newBookData = bookData.filter(item => item.id !== id);
        setBookData(newBookData);
        console.log("Book deleted with id:", id);
    } catch (error) {
        console.error("Error deleting book:", error);
    }
};

const handleAddBook = async (addBookData) => {
  try {
    const response = await axios.post("https://u-pick-up-y7qnw.ondigitalocean.app/api/addnew-books", addBookData);
    console.log(addBookData)
    fetchData();
    console.log(response.data);
    setShowAddBookPage(false);
  } catch (error) {
    console.error("Error adding book:", error);
  }
};

const handleShowAddBookModal = () => {
  setShowAddBookModal(true);
};

const handleCloseAddBookModal = () => {
  setShowAddBookModal(false);
};

const handleCloseModal = () => {
  setShowAddBookPage(false);
};





return (
  <div className='books-page'>
    <Card className='custom-card'>
      <CardBody>
         {showAddBookPage && <AddBookPage onSubmit={handleAddBook} onCancel={handleCancelAdd} />}
        
        <Container>
          <Row className='align-items-center justify-content-center'>
            <Col md={3} style={{ height: '65px', width: '300px'}}> 
              <label htmlFor="courseSelect">Choose a course:</label>
              <select className="form-control" id="courseSelect" onChange={(e) => setSelectedCourse(e.target.value)}>
                <option value="">Select a course</option>

                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </Col>
            <Col md={3} style={{ height: '65px', width: '250px'}}>
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
              <button type="submit" className="btn display-button btn-lg" onClick={handleSubmit} style={{ height: '60px', width: '200px' }}> Display </button>
            </Col>
            <Col md={2}>
              <button type="button" className="btn reset-button btn-lg" onClick={handleReset} style={{ height: '60px', width: '150px' }}> Reset </button>
            </Col>
          </Row>
          <hr className='inventory-line' />
        </Container>


        <Row className="justify-content-end mb-3">
          <Col md={2} className='text-right'>
            <button className="btn btn-add btn-lg" onClick={handleAdd}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </Col>
        </Row>

        <Modal show={showAddBookPage} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddBookPage onSubmit={handleAddBook} onCancel={handleCloseModal} />
          </Modal.Body>
        </Modal>

                   

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
                <th> Action </th>
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
                      <td>
                      {/* <NavLink to={`/view/${book.id}`} className="btn btn-success mx-2">View</NavLink>
                      <NavLink to={`/edit/${book.id}`} className="btn btn-info mx-2">Edit</NavLink>
                      <button onClick={()=>handleDelete(user.id)} className="btn btn-danger">Delete</button> */}
                      <button className="btn btn-edit btn-sm mr-2" onClick={() => handleEdit(book.id)}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <span className="mx-2"></span> {/* Adds a wider space */}
                      <button className="btn btn-delete btn-sm" onClick={() => handleDelete(book.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Books
