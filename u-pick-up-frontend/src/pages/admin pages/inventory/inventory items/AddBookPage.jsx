import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddBookPage = ({ onSubmit, onCancel, setShowModal }) => {
  const [subjectName, setSubjectName] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [course, setCourse] = useState('');
  const [available, setAvailable] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const addBookData = {
      subject_name: subjectName,
      year_level: yearLevel,
      course: course,
      available: available,
      quantity: quantity
    };
    onSubmit(addBookData);
    setShowModal(false);
  };

  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="subjectName">
            <Form.Label>Subject Name</Form.Label>
            <Form.Control type="text" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="yearLevel">
            <Form.Label>Year Level</Form.Label>
            <Form.Control type="text" value={yearLevel} onChange={(e) => setYearLevel(e.target.value)} />
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
            Add 
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddBookPage;