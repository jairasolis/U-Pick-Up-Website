import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditBookPage = ({ editFormData, setEditFormData, handleCloseEditBookModal, handleSubmitEdit }) => {

  const [subject_name, setSubjectName] = useState(editFormData.subjectName);
  const [year_level, setYearLevel] = useState(editFormData.yearLevel);
  const [course, setCourse] = useState(editFormData.course);
  const [available, setAvailable] = useState(editFormData.available);
  const [quantity, setQuantity] = useState(editFormData.quantity);

  const handleClickInsideModal = (event) => {
    // Only stop event propagation if the click target is not the "Update" button
    if (!event.target.closest('.btn-primary')) {
      event.stopPropagation();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedBookData = {
      subject_name,
      year_level,
      course,
      available,
      quantity
    };
    handleSubmitEdit(editedBookData);
    handleCloseEditBookModal();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="subjectName">
          <Form.Label>Subject Name</Form.Label>
          <Form.Control type="text" value={subject_name} onChange={(e) => setSubjectName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="yearLevel">
          <Form.Label>Year Level</Form.Label>
          <Form.Control type="text" value={year_level} onChange={(e) => setYearLevel(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="course">
          <Form.Label>Course</Form.Label>
          <Form.Control type="text" value={course} onChange={(e) => setCourse(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="available">
          <Form.Label>Available</Form.Label>
          <Form.Control type="text" value={available} onChange={(e) => setAvailable(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
        <Button variant="secondary" onClick={handleCloseEditBookModal} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default EditBookPage;
