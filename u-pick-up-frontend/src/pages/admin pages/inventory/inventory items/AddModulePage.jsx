import React, { useState, useEffect } from 'react';


const AddModulePage = ({ onSubmit, onCancel }) => {
    const [subjectName, setSubjectName] = useState('');
    const [yearLevel, setYearLevel] = useState('');
    const [course, setCourse] = useState('');
    const [available, setAvailable] = useState('');
    const [quantity, setQuantity] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const addModuleData = {
        subject_name: subjectName,
        year_level: yearLevel,
        course: course,
        available: available,
        quantity: quantity
      };
      onSubmit(addModuleData);
    };
  
    return (
      <div>
        <h2>Add New Module</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Subject Name</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Year level</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" value={yearLevel} onChange={(e) => setYearLevel(e.target.value)} />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Course</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" value={course} onChange={(e) => setCourse(e.target.value)} />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Available</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" value={available} onChange={(e) => setAvailable(e.target.value)} />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Quantity</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-9 offset-sm-3">
              <button type="submit" className="btn btn-primary m-2">Add Book</button>
              <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    );
  };
  
  export default AddModulePage;
  










