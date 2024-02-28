import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const EditModulePage = ({ editFormData, setEditFormData, handleSubmitEdit, handleCloseEditModuleModal }) => {

  const [subject_code, setSubjectCode] = useState(editFormData.subjectCode);
  const [subject_name, setSubjectName] = useState(editFormData.subjectName);
  const [year_level, setYearLevel] = useState(editFormData.yearLevel);
  const [course, setCourse] = useState(editFormData.course);
  const [available, setAvailable] = useState(editFormData.available);
  const [quantity, setQuantity] = useState(editFormData.quantity);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedModuleData = {
      subject_code,
      subject_name,
      year_level,
      course,
      available,
      quantity
    };
    handleSubmitEdit(editedModuleData);
    handleCloseEditModuleModal();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="subjectCode">
          <Form.Label>Subject Code</Form.Label>
          <Form.Control type="text" value={subject_code} onChange={(e) => setSubjectCode(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="subjectName">
          <Form.Label>Subject Name</Form.Label>
          <Form.Control type="text" value={subject_name} onChange={(e) =>  setSubjectName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="yearLevel">
          <Form.Label>Year Level</Form.Label>
          <Form.Control type="text" value={year_level} onChange={(e) =>  setYearLevel(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="course">
          <Form.Label>Course</Form.Label>
          <Form.Control type="text" value={course} onChange={(e) =>  setCourse(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="available">
          <Form.Label>Available</Form.Label>
          <Form.Control type="text" value={available} onChange={(e) =>  setAvailable(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="text" value={quantity} onChange={(e) =>  setQuantity(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
        <Button variant="secondary" onClick={handleCloseEditModuleModal} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default EditModulePage;
