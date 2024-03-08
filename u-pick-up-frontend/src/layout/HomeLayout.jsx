import React from 'react'
import { Outlet } from 'react-router-dom'

// import components
import LeftBar from '../components/leftBar/LeftBar'
import Navbar2 from '../components/navbar/Navbar2'

const HomeLayout = () => {
  return (
    <div className="div">
      <Navbar2/>
      <div style={{display:'flex'}}> 
        <LeftBar/>
        <Outlet />
      </div>
    </div>
  )
}

export default HomeLayout
