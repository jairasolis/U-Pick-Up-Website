import React from 'react'
import './Navbar.css'

import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div className='navbar'>
        <nav>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div className="logo"> <img src="../images/logo.png" alt="" /></div>
            </Link>        
            
            {/* <div>
                <Link to="/student/sign-up"> 
                  <button className='sign-up-navbtn'>Sign Up</button>
                </Link>
            </div> */}
        </nav>
    </div>
  )
}

export default Navbar