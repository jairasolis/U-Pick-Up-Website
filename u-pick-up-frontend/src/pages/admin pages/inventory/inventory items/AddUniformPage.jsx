import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddUniformPage = ({ onSubmit, onCancel }) => {
  const [uniformType, setUniformType] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [course, setCourse] = useState('');
  const [available, setAvailable] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const addBookData = {
      uniform_type: uniformType,
      year_level: yearLevel,
      course: course,
      available: available,
      quantity: quantity
    };
    onSubmit(addBookData);
  };

  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Uniform</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="UniformType">
            <Form.Label>Uniform Type</Form.Label>
            <Form.Control type="text" value={uniformType} onChange={(e) => setUniformType(e.target.value)} />
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
          <Button variant="secondary" onClick={onCancel} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUniformPage;
