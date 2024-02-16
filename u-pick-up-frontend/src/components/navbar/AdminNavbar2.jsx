import React, { useEffect, useState } from 'react';
// import './Navbar.css';
import './AdminNavbar2.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import useAuth from '../../auth/useAuth';

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(()=>{
    document.addEventListener("mousedown", ()=>{
      setIsMenuOpen(false);
    })
  },[])

  const handleSignOut = async () => {
    try {
      if (!auth) {
        console.error('Authentication token not found');
        return;
      }
      const authToken = localStorage.getItem('authToken');

      const response = await axios.post(
        'https://u-pick-up-y7qnw.ondigitalocean.app/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      localStorage.removeItem('authToken');

      await logout();
      console.log('Logout API response:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error occurred while logging out:', error);
    }
  };

  return (
    <div className='navbar-2'>
      <nav className='navbar-admin'>
        <Link to={auth ? "/admin/dashboard" : "/"} style={{ textDecoration: 'none' }}>
          <div className="logo">
            <img src="../images/logo.png" alt="" />
          </div>
        </Link>

        <div className='right-side'>
          <FontAwesomeIcon icon={faBars} className='menu-icon' onClick={toggleMenu}/>
          <div className={`sub-menu-wrap ${isMenuOpen ? 'open-menu' : ''}`} id="subMenu">
            <div className="sub-menu">

              {/* <Link to="/profile" className="userinfo">
                <h3> Profile </h3>
                <p><FontAwesomeIcon icon={faArrowRight} className='icon' /></p>
              </Link> */}

              <Link onClick={handleSignOut} className="sub-menu-link" style={{ textDecoration: 'none' }}>
                <p> Sign Out </p>
                <p className='arrow'><FontAwesomeIcon icon={faArrowRight} className='icon' /></p>
              </Link>

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
