import React from 'react'
import "./Inventory.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpen, faShirt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const Inventory = () => {
  return (
    <div className='inventory-page'>
      <div className="inventory-wrapper">
        <div className="main-inventory-items">
          <Link to="/admin/inventory-books" className="main-inventory-item"> 
            <FontAwesomeIcon icon={ faBook } className='dash-icon'/>
            <p> Books </p> 
          </Link>
          <Link to="/admin/inventory-uniforms" className="main-inventory-item"> 
            <FontAwesomeIcon icon={ faShirt } className='dash-icon'/>
            <p> Uniforms </p> 
          </Link>
          <Link to="/admin/inventory-modules" className="main-inventory-item"> 
            <FontAwesomeIcon icon={ faBookOpen } className='dash-icon'/>
            <p> Modules </p> 
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Inventory
