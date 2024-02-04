import React from 'react'
import './Profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Profile = () => {
  return (
    <div className='profile-page'>
      <div className="profile-container">
        <div className="profile-icon">
          <FontAwesomeIcon icon={ faUser } className='icon'/>
        </div>
        <div className="profile-content">
          <div className="name"> 
            <h4> Admin </h4>
          </div>
          <hr className='profile-hr'/>
          <div className="class-details">
            <h4>Department: </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
