import React from 'react'
import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpen, faCalendar, faPlus, faShirt, faUser, faUserTie, faBox } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className="dashboard-wrapper">    
        <div className="dash-header">
          <FontAwesomeIcon icon={ faUserTie } className='dashboard-icon'/>
          <h2> Dashboard </h2>
          <hr />
        </div>
        <div className="dashboard-items">
          <Link to="/admin/add-post" className="dashboard-item"> 
            <FontAwesomeIcon icon={ faPlus } className='dash-icon'/>
            <p> Create Post </p> 
          </Link>
          <Link to="/admin/add-event" className="dashboard-item"> 
            <FontAwesomeIcon icon={ faCalendar } className='dash-icon'/>
            <p> Add Event </p> 
          </Link>
          <Link to="/admin/inventory" className="dashboard-item">
            <div className="dashboard-item"> 
              <FontAwesomeIcon icon={ faBox } className='dash-icon'/>
              <p> Inventory </p> 
            </div>
          </Link>
          <Link to="/admin/students" className="dashboard-item"> 
            <FontAwesomeIcon icon={ faUser } className='dash-icon'/>
            <p> Students </p> 
          </Link>
        </div>

        <div className="inventory-header" id='inventory'>
          <FontAwesomeIcon icon={ faBox } className='inventory-icon'/>
          <h2> Inventory </h2>
          <hr />
        </div>

        <div className="inventory-items">
          <Link to="/admin/inventory-books" className="inventory-item">
            <FontAwesomeIcon icon={ faBook } className='dash-icon'/>
            <p> Books </p> 
          </Link>
          <Link to="/admin/inventory-uniforms" className="inventory-item">
            <FontAwesomeIcon icon={ faShirt } className='dash-icon'/>
            <p> Uniform </p> 
          </Link>
          <Link to="/admin/inventory-modules" className="inventory-item">
            <FontAwesomeIcon icon={ faBookOpen } className='dash-icon'/>
            <p> Modules </p> 
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
