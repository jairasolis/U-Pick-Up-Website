import React, { useState, useEffect } from 'react';
import './StudentsByProgram.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


const StudentsByProgram = () => {
  return (
    <div className='by-program'>
        <Row className='dash-nav'>
                <ul>
                    <Link to="/admin/dashboard"> <li> Dashboard </li> </Link>
                    <div className="divider"></div>
                    <Link to="/admin/dashboard-department"> <li> Students Per Department </li> </Link>
                    <div className="divider"></div>
                    <li> Students Per Program </li>
                </ul>
            </Row>
    </div>
  )
}

export default StudentsByProgram
