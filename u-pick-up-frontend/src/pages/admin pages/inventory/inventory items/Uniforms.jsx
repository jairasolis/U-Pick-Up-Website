import React, { useState, useEffect } from 'react';
import './Uniforms.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, CardBody } from 'react-bootstrap';
import AddUniformPage from './AddUniformPage';

const Uniforms = () => {

  const [uniformData, setUniformData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [yearLevels, setYearLevels] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('');
  const [showAddUniformPage, setShowAddUniformPage] = useState(false);

  useEffect(() => {
      fetchData();
      fetchCourses();
      fetchYearLevels();
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/courses.json');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchYearLevels = async () => {
    try {
      const response = await axios.get('/year_level.json');
      setYearLevels(response.data);
    } catch (error) {
      console.error('Error fetching year levels:', error);
    }
  };

  const fetchData = async () => {
      try {
          const result = await axios("https://u-pick-up-y7qnw.ondigitalocean.app/api/uniforms");
          console.log(result.data.results);
          setUniformData(result.data.results)
      } catch (err) {
          console.log("something Wrong");
      }
  }

  const fetchSelectedData = async (course, yearLevel) => {
    try {
      const result = await axios.get(`https://u-pick-up-y7qnw.ondigitalocean.app/api/uniforms/${course}/${yearLevel}`);
      console.log(result.data);
      setUniformData(result.data);
    } catch (err) {
      console.log("Something went wrong while fetching selected data:", err);
    }
  }  
    
  const handleSubmit = () => {
    if (selectedCourse && selectedYearLevel) {
      fetchSelectedData(selectedCourse, selectedYearLevel);
    } else {
      console.log("Please select both course and year level.");
    }
  }

  
  const handleReset = () => {
    
    fetchData();
    console.log("Uniform data reset");
  };

  const handleAdd = () => {
    setShowAddUniformPage(true);
  };

  const handleCancelAdd = () => {
    setShowAddUniformPage(false);
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`https://u-pick-up-y7qnw.ondigitalocean.app/api/uniform-update/${id}`);
      setEditFormData(response.data);
      setEditUniformId(id);
      setShowAddUniformPage(true);
    } catch (error) {
      console.error("Error fetching uniform details for edit:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://u-pick-up-y7qnw.ondigitalocean.app/api/uniform-delete/${id}`);
      const updatedUniformsData = uniformsData.filter(uniform => uniform.id !== id);
      setUniformsData(updatedUniformsData);
      console.log("Uniform deleted with id:", id);
    } catch (error) {
      console.error("Error deleting uniform:", error);
    }
  };  

  const handleAddUniform = async (addUniformData) => {
    try {
      const response = await axios.post("https://u-pick-up-y7qnw.ondigitalocean.app/api/addnew-uniform", addUniformData);
      console.log("Uniform added successfully:", response.data);
      fetchData();
      setShowAddUniformPage(false);
    } catch (error) {
      console.error("Error adding uniform:", error);
    }
  };



  return (
    <div className='uniforms-page'>
      <Card className='custom-card'>
        <CardBody>
          {showAddUniformPage && <AddUniformPage onSubmit={handleAddUniform} onCancel={handleCancelAdd} />}

          <Container>
            <Row className='align-items-center justify-content-center'>
              <Col md={3} style={{ height: '65px', width: '300px'}}> 
            <label htmlFor="courseSelect">Choose a course:</label>
            <select className="form-control" id="courseSelect" onChange={(e) => setSelectedCourse(e.target.value)}>
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </Col>
          <Col md={3} style={{ height: '65px', width: '250px'}}>
              <div>
                <label htmlFor="yearLevelSelect">Choose a year level:</label>
                <select className="form-control" id="yearLevelSelect" onChange={(e) => setSelectedYearLevel(e.target.value)}>
                  <option value="">Select a year level</option>
                  {yearLevels[selectedCourse]?.map(yearLevel => (
                    <option key={yearLevel} value={yearLevel}>{yearLevel}</option>
                  ))}
                </select>
              </div>
          </Col>
          <Col md={2}>
                <button type="submit" className="btn display-button btn-lg" onClick={handleSubmit} style={{ height: '60px', width: '200px' }}> Display </button>
              </Col>
              <Col md={2}>
                <button type="button" className="btn reset-button btn-lg" onClick={handleReset} style={{ height: '60px', width: '150px' }}> Reset </button>
              </Col>
            </Row>
            <hr className='inventory-line' />
        </Container>


        <Row className="justify-content-end mb-3">
            <Col md={2} className='text-right'>
              <button className="btn btn-add btn-lg" onClick={handleAdd}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </Col>
          </Row> 

          <div className="uniforms-container">
            <table>
              <thead>
                <tr>
                  <th> ID </th>
                  <th> Uniform Type </th>
                  <th> Year Level </th>
                  <th> Course </th>
                  <th> Available </th>
                  <th> Quantity </th>
                  <th> Action </th>
                </tr>
              </thead>
              <tbody className='uniforms'>
            {uniformData.map((uniform, i) => {
              console.log("Uniform data:", uniformData)
                return (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{uniform.uniform_type} </td>
                        <td>{uniform.year_level} </td>
                        <td>{uniform.course} </td>
                        <td>{uniform.available} </td>
                        <td>{uniform.quantity} </td>
                        <td>
                            {/* <NavLink to={`/view/${book.id}`} className="btn btn-success mx-2">View</NavLink>
                            <NavLink to={`/edit/${book.id}`} className="btn btn-info mx-2">Edit</NavLink>
                            <button onClick={()=>handleDelete(user.id)} className="btn btn-danger">Delete</button> */}
                            <button className="btn btn-edit btn-sm mr-2" onClick={() => handleEdit(modules.id)}>
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <span className="mx-2"></span> {/* Adds a wider space */}
                            <button className="btn btn-delete btn-sm" onClick={() => handleDelete(modules.id)}>
                              <FontAwesomeIcon icon={faTrash} />
                              </button>
                          </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Uniforms
