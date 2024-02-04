import React from 'react'
import './Students.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'

const Students = () => {
  return (
    <div className='students-page'>
      <div className="students-container">
        <div className="students-wrapper">
          <div className="students-header">
            <FontAwesomeIcon icon={ faBuilding } className='building-icon'/>
            <h3> CITE </h3>
          </div>
          <div className="students-content">
            <div className="left">
              <div className="program">
                <h4> BSIT </h4>
                <p> Students: </p>
                <p> Blocks: </p>
              </div>
            </div>
            <hr />
            <div className="right">
              <div className="student-stats">
                <img src="../images/darlene-removebg.png" alt="" style={{ width: '150px', height: '150px' }} />
                <img src="../images/mnm-removebg.png" alt="" style={{ width: '150px', height: '150px' }}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Students