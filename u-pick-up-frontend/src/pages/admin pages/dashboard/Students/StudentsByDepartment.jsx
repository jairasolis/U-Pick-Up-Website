import React, { useState, useEffect } from 'react';
import './StudentsByDepartment.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


const StudentsByDepartment = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch data from JSON file
    fetch('/infos.json')
      .then(response => response.json())
      .then(data => {
        // Extract department names
        const departmentNames = Object.keys(data);
        setDepartments(departmentNames);
        console.log(departmentNames)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Container fluid>
        <div className='by-department'>
            <Row className='dash-nav'>
                <ul>
                    <Link to="/admin/dashboard"> <li> Dashboard </li> </Link>
                    <div className="divider"></div>
                    <li> Students per Department </li>
                    
                </ul>
            </Row>
            <Row xs={1} md={4} className="g-4">
            {departments.map((department, index) => (
                <Col key={index}>
                    <Link to="/admin/dashboard-program"> 
                        <Card border="secondary">
                            <Card.Header>{department}</Card.Header>
                            <Card.Body>
                            <Card.Text>
                                0
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            ))}
            </Row>
        </div>
    </Container>
  );
}

export default StudentsByDepartment;
