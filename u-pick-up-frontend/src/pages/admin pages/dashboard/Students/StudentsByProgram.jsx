import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentsByProgram.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


const StudentsByProgram = () => {

  const [regStudentsPerProgCount, setRegStudentsPerProgCount] = useState({});

  useEffect(() => {
    const fetchRegisteredStudentsCount = async () => {
      try {
        const response = await axios.get('https://u-pick-up-y7qnw.ondigitalocean.app/api/dashboard/registered-students-per-program-count');
        console.log(response.data)
        setRegStudentsPerProgCount(response.data.counts);
      } catch (error) {
        console.error('Error fetching registered students count:', error);
      }
    };

    fetchRegisteredStudentsCount();
  }, []);

  const programs = Object.keys(regStudentsPerProgCount);

  return (
    <Container fluid>
      <div className='by-program'>
        <Row className='dash-nav'>
          <ul>
            <Link to="/admin/dashboard"> <li> Dashboard </li> </Link>
            <div className="divider"></div>
            <Link to="/admin/dashboard-department"> <li> Students Per Department </li> </Link>
            <div className="divider"></div>
            <Link to="/admin/dashboard-program"> <li> Students Per Program </li> </Link>
          </ul>
        </Row>
        <Row xs={1} md={4} className="g-4">
          {programs.map((program, index) => (
            <Col key={index}>
              <Link to="/admin/dashboard-program">
                <Card border="secondary">
                  <Card.Header>{program}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                        {regStudentsPerProgCount[program]}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  )
}

export default StudentsByProgram
