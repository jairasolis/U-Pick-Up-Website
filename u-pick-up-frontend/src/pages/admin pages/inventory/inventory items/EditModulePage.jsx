import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const EditModulePage = ({ editFormData, setEditFormData, handleSubmitEdit, handleCloseEditModuleModal }) => {
  const handleClickInsideModal = (event) => {
    if (!event.target.closest('.btn-primary')) {
      event.stopPropagation();
    }
  };

  return (
    <Modal show={true} onHide={handleCloseEditModuleModal} onClick={handleClickInsideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Module</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitEdit}>
          <Form.Group className="mb-3" controlId="subjectName">
            <Form.Label>Subject Name</Form.Label>
            <Form.Control type="text" value={editFormData.subjectName} onChange={(e) => setEditFormData({ ...editFormData, subjectName: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="yearLevel">
            <Form.Label>Year Level</Form.Label>
            <Form.Control type="text" value={editFormData.yearLevel} onChange={(e) => setEditFormData({ ...editFormData, yearLevel: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="course">
            <Form.Label>Course</Form.Label>
            <Form.Control type="text" value={editFormData.course} onChange={(e) => setEditFormData({ ...editFormData, course: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="available">
            <Form.Label>Available</Form.Label>
            <Form.Control type="text" value={editFormData.available} onChange={(e) => setEditFormData({ ...editFormData, available: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="text" value={editFormData.quantity} onChange={(e) => setEditFormData({ ...editFormData, quantity: e.target.value })} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
          <Button variant="secondary" onClick={handleCloseEditModuleModal} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModulePage;
