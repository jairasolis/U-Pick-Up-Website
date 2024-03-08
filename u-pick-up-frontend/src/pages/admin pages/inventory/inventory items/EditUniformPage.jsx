import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const EditUniformPage = ({ editFormData, setEditFormData, handleSubmitEdit, handleCloseEditUniformModal }) => {


  const [uniform_type, setUniformType] = useState(editFormData.subjectName);
  const [year_level, setYearLevel] = useState(editFormData.yearLevel);
  const [course, setCourse] = useState(editFormData.course);
  const [available, setAvailable] = useState(editFormData.available);
  const [quantity, setQuantity] = useState(editFormData.quantity);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedUniformData = {
      uniform_type,
      year_level,
      course,
      available,
      quantity
    };
    handleSubmitEdit(editedUniformData);
    handleCloseEditUniformModal();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="uniformType">
          <Form.Label>Uniform Type</Form.Label>
          <Form.Control type="text" value={uniform_type} onChange={(e) => setUniformType(e.target.value)} />
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
        <Button variant="primary" type="submit" className="button-add">
          Update
        </Button>
        <Button variant="secondary" onClick={handleCloseEditUniformModal} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default EditUniformPage;
