import React, { useState, useEffect } from 'react';
import './Modules.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare, faTrash, faL } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, CardBody, Modal } from 'react-bootstrap';
import AddModulePage from './AddModulePage';
import EditModulePage from './EditModulePage'; 

const Modules = () => {

  const [modulesData, setModulesData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [yearLevels, setYearLevels] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('');
  const [showAddModulePage, setShowAddModulePage] = useState(false);
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [showEditModuleModal, setShowEditModuleModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editModuleId, setEditModuleId] = useState(null);

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
          const result = await axios("https://u-pick-up-y7qnw.ondigitalocean.app/api/modules");
          console.log(result.data.results);
          setModulesData(result.data.results)
      } catch (err) {
          console.log("something Wrong");
      }
  }

  const fetchSelectedData = async (course, yearLevel) => {
    try {
      const result = await axios.get(`https://u-pick-up-y7qnw.ondigitalocean.app/api/modules/${course}/${yearLevel}`);
      console.log(result.data);
      setModulesData(result.data);
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
    setSelectedCourse('');
    setSelectedYearLevel('');
    fetchData();
    console.log("Module data reset");
  };

  const handleEditModule = async (editedModuleData) => {
    try {
      const response = await axios.put(`https://u-pick-up-y7qnw.ondigitalocean.app/api/modules-update/${editedModuleData.id}`, editedModuleData);
      console.log(response.data);
      fetchData(); // Fetch updated data after editing
      setShowEditModuleModal(false); // Close the edit modal after editing
    } catch (error) {
      console.error("Error editing module:", error);
    }
  };

  const handleEdit = () => {
    setShowEditModuleModal(true); 
  }

  const handleCloseEditModuleModal = () => {
    setShowEditModuleModal(false);
    setEditModuleId(null);
    setEditFormData({});
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`https://u-pick-up-y7qnw.ondigitalocean.app/api/modules-delete/${id}`);
      const newModulesData = modulesData.filter(module => module.id !== id);
      setModulesData(newModulesData);
      console.log("Module deleted with id:", id);
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };  

  const handleAddModule = async (addModuleData) => {
    try {
      const response = await axios.post("https://u-pick-up-y7qnw.ondigitalocean.app/api/addnew-modules", addModuleData);
      console.log(addModuleData);
      fetchData();
      console.log(response.data);
      setShowAddModulePage(false);
    } catch (error) {
      console.error("Error adding module:", error);
    }
  };

  const handleAdd = () => {
    setShowAddModulePage(true);
  };

  const handleCancelAdd = () => {
    setShowAddModulePage(false);
  };
  
  const handleCloseModal = () => {
    setShowAddModulePage(false);
  };



  return (
    <div className='modules-page'>
      <Card className='custom-card'>
        <CardBody>
          {showAddModulePage && <AddModulePage onSubmit={handleAddModule} onCancel={handleCancelAdd} />}

          {showEditModuleModal && (
            <EditModulePage
              editFormData={editFormData}
              setEditFormData={setEditFormData}
              handleSubmitEdit={handleEditModule}
              handleCloseEditModuleModal={handleCloseEditModuleModal}
            />
          )}

          <Container>
            <Row className='align-items-center justify-content-center'>
              <Col md={3} style={{ height: '65px', width: '300px'}}> 
                <label htmlFor="courseSelect">Choose a course:</label>
                <select className="form-control" id="courseSelect" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                  <option value="">Select a course</option>
                  {courses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </Col>
              <Col md={3} style={{ height: '65px', width: '250px'}}>
                <div>
                  <label htmlFor="yearLevelSelect">Choose a year level:</label>
                  <select className="form-control" id="yearLevelSelect"  value={selectedYearLevel} onChange={(e) => setSelectedYearLevel(e.target.value)}>
                    <option value="">Select a year level</option>
                    {yearLevels[selectedCourse]?.map(yearLevel => (
                      <option key={yearLevel} value={yearLevel}>{yearLevel}</option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col md={2}>
                <button type="submit" className="btn display-button" onClick={handleSubmit}> Display </button>
                <button type="button" className="btn reset-button" onClick={handleReset}> Reset </button>
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
          
          <Modal show={showAddModuleModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Module</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddModulePage onSubmit={handleAddModule} onCancel={handleCloseModal} />
            </Modal.Body>
          </Modal>

          <div className="modules-container">
            <table>
              <thead>
                <tr>
                  <th> ID </th>
                  <th> Subject code </th>
                  <th> Subject name </th>
                  <th> Year Level </th>
                  <th> Course </th>
                  <th> Available </th>
                  <th> Quantity </th>
                  <th> Action </th>
                </tr>
              </thead>
              <tbody className='modules'>
                {modulesData.map((modules, i) => {
                  console.log("Module data:", modulesData);
                  return (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{modules.subject_code} </td>
                        <td>{modules.subject_name} </td>
                        <td>{modules.year_level} </td>
                        <td>{modules.course} </td>
                        <td>{modules.available} </td>
                        <td>{modules.quantity} </td>
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

          <Modal show={showEditModuleModal} onHide={handleCloseEditModuleModal} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>Edit Module</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
              <EditModulePage
                editFormData={editFormData}
                editModuleId={editModuleId}
                onSubmit={handleEditModule}
                onCancel={handleCloseEditModuleModal}
                />
            </Modal.Body>
          </Modal>
        </CardBody>
      </Card>
    </div>
  );
}

export default Modules
