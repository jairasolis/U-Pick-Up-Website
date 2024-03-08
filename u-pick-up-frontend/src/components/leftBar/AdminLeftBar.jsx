
import React, { useState } from "react";
import "./AdminLeftBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePen,
  faCalendarDays,
  faBook,
  faUser,
  faBookOpen,
  faShirt,
  faChartColumn,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const AdminLeftBar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="leftbar">
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