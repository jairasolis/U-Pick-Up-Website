import React, { useEffect, useState } from 'react';
// import './Navbar.css';
import './Navbar2.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import useAuth from '../../auth/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(()=>{
    document.addEventListener("mousedown", ()=>{
      setIsMenuOpen(false);
    });
  },[]);

  const handleSignOut = async () => {
    try {
      if (!auth) {
        console.error('User is not logged in');
        return;
      }

      const authToken = localStorage.getItem('authToken');
      await logout();

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
        <Link to={auth ? "/student/home" : "/"} style={{ textDecoration: 'none' }}>
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

              <Link to="/student/help" className="sub-menu-link" style={{ textDecoration: 'none' }}>
                <h3> FAQs </h3>
                <p><FontAwesomeIcon icon={faArrowRight} className='icon' /></p>
              </Link>

              <hr />

              <Link onClick={handleSignOut} className="sub-menu-link" style={{ textDecoration: 'none' }}>
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

export default Navbar;
