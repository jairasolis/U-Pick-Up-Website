import React, { useEffect, useState } from 'react';
// import './Navbar.css';
import './AdminNavbar2.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(()=>{
    document.addEventListener("mousedown", ()=>{
      setIsMenuOpen(false);
    })
    setIsLoggedIn(true);
  },[])

  const handleSignOut = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
  
      if (!authToken) {
        console.error('Authentication token not found');
        navigate('/');
        return;
      }
  
      const response = await axios.post(
        'https://u-pick-up-y7qnw.ondigitalocean.app/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      console.log('Logout API response:', response.data);
  
      localStorage.removeItem('authToken');
  
      navigate('/');
    } catch (error) {
      console.error('Error occurred while logging out:', error);
    }
  };

  return (
    <div className='navbar-2'>
      <nav>
        <Link to={isLoggedIn ? "/admin/dashboard" : "/"}>
          <div className="logo">
            <img src="../images/logo.png" alt="" />
          </div>
        </Link>

        <div className='right-side'>
          <div className="profile" onClick={toggleMenu}></div>
          <div className={`sub-menu-wrap ${isMenuOpen ? 'open-menu' : ''}`} id="subMenu">
            <div className="sub-menu">

              {/* <Link to="/profile" className="userinfo">
                <h3> Profile </h3>
                <p><FontAwesomeIcon icon={faArrowRight} className='icon' /></p>
              </Link> */}

              <Link onClick={handleSignOut} className="sub-menu-link">
                <h3> Sign Out </h3>
                <p><FontAwesomeIcon icon={faArrowRight} className='icon' /></p>
              </Link>

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
