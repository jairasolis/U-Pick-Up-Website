import React from 'react'
import "./InventoryStudent.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpen, faShirt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const Inventory = () => {
  return (
    <div className='inventory-page'>
      <Container className="inventory-wrapper">
          <Row className="justify-content-center inventory-row"> 
            <Col xs="auto">
              <Link to="/student/inventory-books" style={{ textDecoration: 'none' }}> 
                <Card className="student-inventory-item">
                  <Col>
                    <FontAwesomeIcon icon={faBook} className='student-inventory-icon' />
                  </Col>
                  <Col className='inv-text'>
                    <p> Books </p>
                  </Col>
                </Card>
              </Link>
            </Col>
            <Col xs="auto">
              <Link to="/student/inventory-uniforms" style={{ textDecoration: 'none' }}> 
                <Card className="student-inventory-item">
                  <Col>
                    <FontAwesomeIcon icon={faShirt} className='student-inventory-icon' />
                  </Col>
                  <Col className='inv-text'>
                    <p> Uniforms </p>
                  </Col>
                </Card>
              </Link>
            </Col>
            <Col xs="auto">
              <Link to="/student/inventory-modules" style={{ textDecoration: 'none' }}> 
                <Card className="student-inventory-item">
                  <Col>
                    <FontAwesomeIcon icon={faBookOpen} className='student-inventory-icon' />
                  </Col>
                  <Col className='inv-text'>
                    <p> Modules </p>
                  </Col>
                </Card>
              </Link>
            </Col>
          </Row>
      </Container>
    </div>
  )
}

export default Inventory
