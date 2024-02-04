import React, { useEffect, useState } from 'react';
// import './Navbar.css';
import './Navbar2.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(()=>{
    document.addEventListener("mousedown", ()=>{
      setIsMenuOpen(false);
    })
  })

  return (
    <div className='navbar-2'>
      <nav>
        <Link to="/">
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

              <Link to="/student/help" className="sub-menu-link">
                <h3> FAQs </h3>
                <p><FontAwesomeIcon icon={faArrowRight} className='icon' /></p>
              </Link>

              <hr />

              <Link to="/" className="sub-menu-link">
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
