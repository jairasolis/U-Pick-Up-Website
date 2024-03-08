
import React, { useState } from "react";
import "./AdminLeftBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faCaretDown,
  faSquarePen,
  faCalendarDays,
  faBook,
  faUser,
  faCaretRight,
  faBookOpen,
  faShirt,
  faChartColumn,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

/*const AdminLeftBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="leftBar">
      <div className="leftbar-containers">
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
          </div> 
          <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
            <div className="admin-leftnav">
              <FontAwesomeIcon icon={faChartColumn} className="icon" />
              <p> Dashboard </p>
            </div>
          </Link>
          <Link to="/admin/add-post" style={{ textDecoration: "none" }}>
            <div className="admin-leftnav">
              <FontAwesomeIcon icon={faSquarePen} className="icon" />
              <p> Create Post </p>
            </div>
          </Link>
          <Link to="/admin/add-event" style={{ textDecoration: "none" }}>
            <div className="admin-leftnav">
              <FontAwesomeIcon icon={faCalendarDays} className="icon" />
              <p> Add event </p>
            </div>
          </Link>
          <hr />
          <p className="inventory-p"> Inventory </p>
          <Link to="/admin/inventory-books" style={{ textDecoration: "none" }}>
            <div className="admin-leftnav">
              <FontAwesomeIcon icon={faBook} className="icon" />
              <p> Books </p>
            </div>
          </Link>
          <Link
            to="/admin/inventory-modules"
            style={{ textDecoration: "none" }}
          >
            <div className="admin-leftnav">
              <FontAwesomeIcon icon={faBookOpen} className="icon" />
              <p> Modules </p>
            </div>
          </Link>
          <Link
            to="/admin/inventory-uniforms"
            style={{ textDecoration: "none" }}
          >
            <div className="admin-leftnav">
              <FontAwesomeIcon icon={faShirt} className="icon" />
              <p> Uniforms </p>
            </div>
          </Link>
          <hr />
          <Link to="/admin/profile" style={{ textDecoration: "none" }}>
            <div className="admin-leftnav">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <p> Profile </p>
            </div>
          </Link>
          <hr />
        </div>
      </div>
    </div>
  );
};*/

const AdminLeftBar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="leftbar">
{/*       <div className="content">
        <i className="fa fa-arrow-right" id="btn" onClick={toggleSidebar}></i>
      </div> */}
      <ul className="adminNav_list">
        <li>
          <Link to="/admin/dashboard" className="list-leftbar">
            <FontAwesomeIcon icon={faChartColumn} />
            <span className="links_name">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/add-post" className="list-leftbar">
            <FontAwesomeIcon icon={faSquarePen} />
            <span className="links_name">Add Post</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/add-event" className="list-leftbar">
            <FontAwesomeIcon icon={faCalendarDays} />
            <span className="links_name">Add Event</span>
          </Link>
        </li>
        <hr /> 
        <p className="inventory-p"> Inventory </p>
        <li>
          <Link to="/admin/inventory-books" className="list-leftbar">
            <FontAwesomeIcon icon={faBook} />
            <span className="links_name">Books</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/inventory-modules" className="list-leftbar">
            <FontAwesomeIcon icon={faBookOpen} />
            <span className="links_name">Modules</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/inventory-uniforms" className="list-leftbar">
            <FontAwesomeIcon icon={faShirt} />
            <span className="links_name">Uniforms</span>
          </Link>
        </li>
        <hr /> 
        <li>
          <Link to="/admin/profile" className="list-leftbar">
            <FontAwesomeIcon icon={faUser} className="leftbar-icon"/>
            <span className="links_name">Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminLeftBar;