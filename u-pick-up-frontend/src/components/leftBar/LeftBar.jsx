import React from 'react'
import './LeftBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const LeftBar = () => {
  return (
    <div className="leftBar">
      <div className="leftbar-container">
          <div className="menu"> 
            <Link to="/student/home">
              <div className="house">
                <FontAwesomeIcon icon={ faHouse } className='icon'/>
                <p> Home </p>
              </div>
            </Link>
            <Link to="/student/calendar">
              <div className="calendar">
                <FontAwesomeIcon icon={faCalendar} className='icon'/>
                <p> Calendar </p> 
              </div>
            </Link>
            <Link to="/student/profile">
              <div className="profile-left">
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
