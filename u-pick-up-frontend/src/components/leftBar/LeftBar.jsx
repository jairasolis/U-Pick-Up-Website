import React, { useState } from 'react';
import './LeftBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCalendar, faUser, faBook } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

/*const LeftBar = () => {
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
}*/


const LeftBar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="sidebar">
      <div className="logo_content">
        <div className="logo">
          <i className="fas fa-u"></i>
          <div className="logo_name">UpickUp</div>
        </div>
        <i className="fa fa-arrow-right" id="btn" onClick={toggleSidebar}></i>
      </div>
      <ul className="nav_list">
        <li>
          <Link to="/student/home">
            <FontAwesomeIcon icon={faHouse} />
            <span className="links_name">Home</span>
          </Link>
          <span className="tooltip">Home</span>
        </li>
        <li>
          <Link to="/student/calendar">
            <FontAwesomeIcon icon={faCalendar} />
            <span className="links_name">Calendar</span>
          </Link>
          <span className="tooltip">Calendar</span>
        </li>
        <li>
          <Link to="/student/inventory">
            <FontAwesomeIcon icon={faBook} />
            <span className="links_name">Inventory</span>
          </Link>
          <span className="tooltip">Inventory</span>
        </li>
        <li>
          <Link to="/student/profile">
            <FontAwesomeIcon icon={faUser} />
            <span className="links_name">Profile</span>
          </Link>
          <span className="tooltip">Profile</span>
        </li>
      </ul>
    </div>
  );
};


export default LeftBar;
