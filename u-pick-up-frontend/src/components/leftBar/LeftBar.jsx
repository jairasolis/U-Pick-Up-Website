import React, { useState } from 'react';
import './LeftBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCalendar, faUser, faBook } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const LeftBar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="sidebar">
      <ul className="nav_list">
        <li>
          <Link to="/student/home"  className="list-leftbar">
            <FontAwesomeIcon icon={faHouse} />
            <span className="links_name">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/student/calendar"  className="list-leftbar">
            <FontAwesomeIcon icon={faCalendar} />
            <span className="links_name">Calendar</span>
          </Link>
        </li>
        <li >
          <Link to="/student/inventory"  className="list-leftbar">
            <FontAwesomeIcon icon={faBook} />
            <span className="links_name">Inventory</span>
          </Link>
        </li>
        <li>
          <Link to="/student/profile"  className="list-leftbar">
            <FontAwesomeIcon icon={faUser} />
            <span className="links_name">Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};


export default LeftBar;
