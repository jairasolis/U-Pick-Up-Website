import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, createRoutesFromElements, Navigate } from 'react-router-dom'
import './App.css'
import PrivateRoutes from './PrivateRoutes'

////////// import pages
import Login from './pages/login/login'


// student pages
import LandingPage from './pages/student pages/landing page/LandingPage'
import StudentSignUp2 from './pages/student pages/sign up/SignUp2'
import StudentSignIn2 from './pages/student pages/sign in/SignIn2'
import Home from './pages/student pages/home/Home'
import Profile from './pages/student pages/profile/Profile'
import Calendar from './pages/student pages/calendar/Calendar'
import Chat from './pages/student pages/chat/Chat'
import Faq from './pages/student pages/help/Faq'


// admin pages
import AdminSignUp2 from './pages/admin pages/sign up/SignUp2'
import AdminSignIn2 from './pages/admin pages/sign in/SignIn2'
import Dashboard from './pages/admin pages/dashboard/Dashboard'
import AddPost from './pages/admin pages/add post/AddPost'
import AddEvent from './pages/admin pages/add event/AddEvent'
import AdminProfile from './pages/admin pages/profile/Profile'
import Inventory from './pages/admin pages/inventory/Inventory'
import Students from './pages/admin pages/students/Students'
import Uniforms from './pages/admin pages/inventory/inventory items/Uniforms'
import Books from './pages/admin pages/inventory/inventory items/Books'
import Modules from './pages/admin pages/inventory/inventory items/Modules'


// import layout
import HomeLayout from './layout/HomeLayout'
import DashboardLayout from './layout/DashboardLayout'




const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (authToken) => {
    localStorage.setItem('authToken', authToken);
    setIsLoggedIn(true);
    console.log('User logged in');

  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin}/>} />

          {/* student pages */}
          {/*  public routes */}
          <Route path="/student/sign-up" element={<StudentSignUp2/>} />
          <Route path="/student/sign-in" element={<StudentSignIn2/>} />
     
          {/*  private routes */}
          <Route element={<HomeLayout />}>
            <Route element={<PrivateRoutes/>}> 
              <Route path="/student/home" isLoggedIn={isLoggedIn} element={<Home/>} />
              <Route path="/student/profile" isLoggedIn={isLoggedIn} element={<Profile/>} />
              <Route path="/student/calendar" isLoggedIn={isLoggedIn} element={<Calendar/>} />

              <Route path="/student/chat-support" isLoggedIn={isLoggedIn} element={<Chat />} />
              <Route path="/student/help" isLoggedIn={isLoggedIn} element={<Faq />} />
            </Route>
          </Route>

          {/* admin pages */}
          {/*  public routes */}
          <Route path="/admin/sign-up" element={<AdminSignUp2/>} />
          <Route path="/admin/sign-in" element={<AdminSignIn2/>} />

          {/*  private routes */}
          <Route element={<PrivateRoutes/>}> 

            <Route element={<DashboardLayout />}>
              <Route path="/admin/dashboard" isLoggedIn={isLoggedIn} element={<Dashboard/>} />
              <Route path="/admin/add-post" isLoggedIn={isLoggedIn} element={<AddPost/>} />
              <Route path="/admin/add-event" isLoggedIn={isLoggedIn} element={<AddEvent/>} />
              <Route path="/admin/inventory" isLoggedIn={isLoggedIn} element={<Inventory/>} />
              <Route path="/admin/inventory-books" isLoggedIn={isLoggedIn} element={<Books/>} />
              <Route path="/admin/inventory-uniforms" isLoggedIn={isLoggedIn} element={<Uniforms/>} />
              <Route path="/admin/inventory-modules" isLoggedIn={isLoggedIn} element={<Modules/>} />
              <Route path="/admin/students" isLoggedIn={isLoggedIn} element={<Students/>} />
              <Route path="/admin/profile" isLoggedIn={isLoggedIn} element={<AdminProfile/>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App