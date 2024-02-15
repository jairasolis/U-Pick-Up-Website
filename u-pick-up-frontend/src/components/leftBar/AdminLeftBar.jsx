import React, { useState } from 'react';
import './AdminLeftBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faCaretDown, faSquarePen, faCalendarDays, faBook, faUser, faCaretRight, faBookOpen, faShirt, faChartColumn } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AdminLeftBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="leftBar">
      <div className="leftbar-container">
        <div className="menu">
          {/* <div className="dashboard-dropdown">
            <div className="dashboard-menu" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faCaretRight} className={`dropdown-icon ${isDropdownOpen ? 'rotate-90' : ''}`} />              
            <FontAwesomeIcon icon={faChalkboardUser} className='icon' />
              <h4> Dashboard </h4>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <Link to="/admin/add-post">
                  <div className="dropdown-item">
                    <FontAwesomeIcon icon={faSquarePen} className='icon' />
                    <h4> Create Post </h4>
                  </div>
                </Link>
                <Link to="/admin/add-event">
                  <div className="dropdown-item">
                    <FontAwesomeIcon icon={faCalendarDays} className='icon' />
                    <h4> Add event </h4>
                  </div>
                </Link>
                <Link to="/admin/inventory">
                  <div className="dropdown-item">
                    <FontAwesomeIcon icon={faBook} className='icon' />
                    <h4> Inventory </h4>
                  </div>
                </Link>
                <Link to="/admin/students">
                  <div className="dropdown-item">
                    <FontAwesomeIcon icon={faUser} className='icon' />
                    <h4> Student </h4>
                  </div>
                </Link>
              </div>
            )}
          </div> */}
          <Link to="/admin/dashboard">
            <div className="profile-left">
              <FontAwesomeIcon icon={faChartColumn} className='icon' />
              <p> Dashboard </p>
            </div>
          </Link>
          <Link to="/admin/add-post">
            <div className="profile-left">
              <FontAwesomeIcon icon={faSquarePen} className='icon' />
              <p> Create Post </p>
            </div>
          </Link>
          <Link to="/admin/add-event">
            <div className="profile-left">
              <FontAwesomeIcon icon={faCalendarDays} className='icon' />
              <p> Add event </p>
            </div>
          </Link>
          <hr />
          <p> Inventory </p>
          <Link to="/admin/inventory-books">
            <div className="profile-left">
              <FontAwesomeIcon icon={faBook} className='icon' />
              <p> Books </p>
            </div>
          </Link>
          <Link to="/admin/inventory-modules">
            <div className="profile-left">
              <FontAwesomeIcon icon={faBookOpen} className='icon' />
              <p> Modules </p>
            </div>
          </Link>
          <Link to="/admin/inventory-uniforms">
            <div className="profile-left">
              <FontAwesomeIcon icon={faShirt} className='icon' />
              <p> Uniforms </p>
            </div>
          </Link>
          <hr />
          <Link to="/admin/profile">
            <div className="profile-left">
              <FontAwesomeIcon icon={faUser} className='icon' />
              <p> Profile </p>
            </div>
          </Link>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default AdminLeftBar;
