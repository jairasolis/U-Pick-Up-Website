import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'

// import component
// import Navbar from '../../components/navbar/Navbar'


const login = () => {
  return (
    <div>
      <nav className='login-nav'>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="logo"> <img src="../images/logo.png" alt="" /></div>
          </Link>        
          
          <div>
              <Link to="/student/sign-up"> 
                <button className='sign-up-navbtn'>Sign Up</button>
              </Link>
          </div>
        </nav>
      <div className='login-page'>
        <div className="login-container">
          <div className="phinma-logo">
            <img src="../images/phinma.png" alt="" />
          </div>
          <div className="login-text"> Log in as</div>
          <div className="login-items">
            <Link to="/student/sign-in" className="login-item" style={{ textDecoration: 'none' }}> <p> Student </p> </Link>
            <Link to="/admin/sign-in" className="login-item" style={{ textDecoration: 'none' }}> <p> Admin </p> </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login
