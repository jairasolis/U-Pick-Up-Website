import React from 'react'
import './LeftBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCalendar, faUser, faBook } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const LeftBar = () => {
  return (
    <div className="leftBar">
      <div className="leftbar-container">
          <div className="menu"> 
            <Link to="/student/home" style={{ textDecoration: 'none' }}>
              <div className="admin-leftnav">
                <FontAwesomeIcon icon={ faHouse } className='icon'/>
                <p> Home </p>
              </div>
            </Link>
            <Link to="/student/calendar" style={{ textDecoration: 'none' }}>
              <div className="admin-leftnav">
                <FontAwesomeIcon icon={faCalendar} className='icon'/>
                <p> Calendar </p> 
              </div>
            </Link>
            <Link to="/student/inventory" style={{ textDecoration: 'none' }}>
              <div className="admin-leftnav">
                <FontAwesomeIcon icon={faBook} className='icon' />
                <p> Inventory </p>
              </div>
            </Link>
            <Link to="/student/profile" style={{ textDecoration: 'none' }}>
              <div className="admin-leftnav">
                <FontAwesomeIcon icon={faUser} className='icon'/>
                <p> Profile </p> 
              </div>
            </Link>
            <hr />
          </div>
      </div>
    </div>
  )
}

export default LeftBar
