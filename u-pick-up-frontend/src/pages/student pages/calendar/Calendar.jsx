import React from 'react'
import './Calendar.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons'

const Calendar = () => {
  return (
    <div className='calendar-page'>
      <div className="calendar-container">
        <div className="arrow-btn">
          <FontAwesomeIcon icon={ faLessThan } className='icon'/>
        </div>
        <div className="calendar-box">
          <div className="calendar-header">
            <h3> January </h3>
          </div>
          <div className="calendar-body">
          </div>
        </div>
        <div className="arrow-btn">
          <FontAwesomeIcon icon={ faGreaterThan } className='icon'/>
        </div>
      </div>
      
      <div id='alert' className="announcements-container">
        <div className="announcement-alert">

        </div>
        <div className="announcement-alert">

        </div>
        <div className="announcement-alert">

        </div>
        <div className="announcement-alert">

        </div>
      </div>
    </div>
  )
}

export default Calendar
