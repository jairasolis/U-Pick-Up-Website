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
import EditBookPage from './EditBookPage'; 
import Swal from 'sweetalert2'

const Books = () => {

  const [bookData, setBookData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [yearLevels, setYearLevels] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('');
  const [showAddBookPage, setShowAddBookPage] = useState(false);
  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const [editFormData, setEditFormData] = useState([]);
  const [editBookId, setEditBookId] = useState(null);

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

    setSelectedCourse('');
    setSelectedYearLevel('');
    // Fetch all books again to show all the bookData state
    fetchData();
    console.log("Book data reset");
  };

  const handleEditBook = async (editBookData) => {
    try {
      console.log(editBookData)
      const response = await axios.put(`https://u-pick-up-y7qnw.ondigitalocean.app/api/books-update/${editBookId}`, editBookData);
      console.log(response.data);
      fetchData(); // Fetch updated data after editing
      setShowEditBookModal(false); // Close the edit modal after editing
    } catch (error) {
      console.error("Error editing book:", error);
    }
  };

  const handleEdit = (id) => {
    console.log(id)
    setEditBookId(id); // Set the editBookId state with the id of the book to be edited
    setShowEditBookModal(true); // Set state to true when the edit button is clicked
  };
  
  
  const handleCloseEditBookModal = () => {
    setShowEditBookModal(false);
    setEditBookId(null);
    setEditFormData({});
  };
  
  // const handleDelete = async (id) => {
  //   console.log(id);
  //   try {
  //       await axios.delete(`https://u-pick-up-y7qnw.ondigitalocean.app/api/booksdelete/${id}`);
  //       const newBookData = bookData.filter(item => item.id !== id);
  //       setBookData(newBookData);
  //       console.log("Book deleted with id:", id);
  //   } catch (error) {
  //       console.error("Error deleting book:", error);
  //   }
  // };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // If user confirms deletion, the book item will be deleted hoho
          await axios.delete(`https://u-pick-up-y7qnw.ondigitalocean.app/api/booksdelete/${id}`);
          const newBookData = bookData.filter(item => item.id !== id);
          setBookData(newBookData);
          console.log('Book deleted with id:', id);
          Swal.fire({
            title: 'Deleted!',
            text: 'Book item has been deleted.',
            icon: 'success'
          });
        } catch (error) {
          console.error('Error deleting book:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete the book.',
            icon: 'error'
          });
        }
      }
    });
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

  const handleAdd = () => {
    setShowAddBookPage(true);
  };

  const handleCancelAdd = () => {
    setShowAddBookPage(false);
  };


  const handleCloseModal = () => {
    setShowAddBookPage(false);
  };



  return (
    <div className='books-page'>
      <Card className='books-custom-card'>
        <CardBody>
          {showAddBookPage && <AddBookPage onSubmit={handleAddBook} onCancel={handleCancelAdd} />}

          <Row className='align-items-center justify-content-center'>
            <Col xs={10} sm={6} md={3} style={{ height: '40px',  width: '300px'}}> 
              <select className="form-control" id="courseSelect" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                <option value="">Select a course</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </Col>
            <Col xs={10} sm={6} md={3} style={{ height: '40px', width: '300px'}}> 
              <div>
                <select className="form-control" id="yearLevelSelect"  value={selectedYearLevel} onChange={(e) => setSelectedYearLevel(e.target.value)}>
                  <option value="">Select a year level</option>
                  {yearLevels[selectedCourse]?.map(yearLevel => (
                    <option key={yearLevel} value={yearLevel}>{yearLevel}</option>
                  ))}
                </select>
              </div>
            </Col>
            <Col xs={12} sm={12} md={2} style={{ textAlign: 'center' }}>
              <button type="submit" className="btn display-button" onClick={handleSubmit}> Display </button>
              <button type="button" className="btn reset-button"  onClick={handleReset}> Reset </button>
            </Col>
            <Col xs={12} sm={12} md={2} style={{ textAlign: 'center' }}>
              <button className="btn btn-add btn" onClick={handleAdd}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </Col>
          </Row>
          <hr className='inventory-line' />
  
        <div className="books-container">
          <div className="table-container">

            <table>
              <thead className='table-header'>
                <tr>
                  <th> ID </th>
                  <th> Subject name </th>
                  <th> Year Level </th>
                  <th> Course </th>
                  <th> Available </th>
                  <th> Quantity </th>
                  <th className='no-border-right'> Action </th>
                </tr>
              </thead>
              <tbody className='books'>
                {bookData.length === 0 ? (
                  <tr>
                    <td colSpan="7">No books available</td>
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
                      <td className='no-border-right'>
                        <button className="btn btn-edit btn-sm mr-2" onClick={() => handleEdit(book.id)}>
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <span className="mx-2"></span>
                        <button className="btn btn-delete btn-sm" onClick={() => handleDelete(book.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <Modal show={showEditBookModal} onHide={handleCloseEditBookModal} backdrop="static" className="modal-edit">
            <Modal.Header closeButton>
              <Modal.Title>Edit Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Pass editFormData, editBookId, and onSubmit function for editing */}
              <EditBookPage
                editFormData={editFormData}
                setEditFormData={setEditFormData}
                handleSubmitEdit={handleEditBook} 
                handleCloseEditBookModal={handleCloseEditBookModal}
              />
            </Modal.Body>
          </Modal>
        </CardBody>
      </Card>
    </div>
  );
}

export default Books
