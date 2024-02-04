import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'

// import component
import Navbar from '../../components/navbar/Navbar'


const login = () => {
  return (
    <div>
      <Navbar/>
      <div className='login-page'>
        <div className="login-container">
          <div className="phinma-logo">
            <img src="../images/phinma.png" alt="" />
          </div>
          {/* <div className="login-text"> Log in as</div> */}
          <div className="login-items">
            <Link to="/student/sign-in" className="login-item"> <p> Student </p> </Link>
            <Link to="/admin/sign-in" className="login-item"> <p> Admin </p> </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login
