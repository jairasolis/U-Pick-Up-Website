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
                <h4> Home </h4>
              </div>
            </Link>
            <Link to="/student/calendar">
              <div className="calendar">
                <FontAwesomeIcon icon={faCalendar} className='icon'/>
                <h4> Calendar </h4> 
              </div>
            </Link>
            <Link to="/student/profile">
              <div className="profile-left">
                <FontAwesomeIcon icon={faUser} className='icon'/>
                <h4> Profile </h4> 
              </div>
            </Link>
            <hr />
          </div>
      </div>
    </div>
  )
}

export default LeftBar
