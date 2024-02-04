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
            <h4> John Weak </h4>
          </div>
          <hr className='profile-hr'/>
          <div className="personal-details">
            <h4>Gender: </h4>
            <h4>Birthday: </h4>
            <h4>Address: </h4>
          </div>
          <hr className='profile-hr'/>
          <div className="class-details">
            <h4>Block: </h4>
            <h4>Course: </h4>
            <h4>Year: </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
