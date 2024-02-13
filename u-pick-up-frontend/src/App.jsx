import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import "./App.css";
import PrivateRoutes from './PrivateRoutes';
import PrivateRoutesAdmin from "./PrivateRoutesAdmin";
import useAuth from "./auth/useAuth";

////////// import pages
import Login from "./pages/login/login";

// student pages
import LandingPage from "./pages/student pages/landing page/LandingPage";
import StudentSignUp2 from "./pages/student pages/sign up/SignUp2";
import StudentSignIn2 from "./pages/student pages/sign in/SignIn2";
import Home from "./pages/student pages/home/Home";
import Profile from "./pages/student pages/profile/Profile";
import Calendar from "./pages/student pages/calendar/Calendar";
import Chat from "./pages/student pages/chat/Chat";
import Faq from "./pages/student pages/help/Faq";

// admin pages
import AdminSignUp2 from "./pages/admin pages/sign up/SignUp2";
import AdminSignIn2 from "./pages/admin pages/sign in/SignIn2";
import Dashboard from "./pages/admin pages/dashboard/Dashboard";
import AddPost from "./pages/admin pages/add post/AddPost";
import AddEvent from "./pages/admin pages/add event/AddEvent";
import AdminProfile from "./pages/admin pages/profile/Profile";
import Inventory from "./pages/admin pages/inventory/Inventory";
import Students from "./pages/admin pages/students/Students";
import Uniforms from "./pages/admin pages/inventory/inventory items/Uniforms";
import Books from "./pages/admin pages/inventory/inventory items/Books";
import Modules from "./pages/admin pages/inventory/inventory items/Modules";

// import layout
import HomeLayout from "./layout/HomeLayout";
import DashboardLayout from "./layout/DashboardLayout";

const App = () => {
  const { auth, role } = useAuth();

  // const handleLogin = (authToken) => {
  //   localStorage.setItem('authToken', authToken);
  //   setIsLoggedIn(true);
  //   console.log('User logged in');

  // };

  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          {/* student pages */}
          {/*  public routes */}
          <Route
            path="/student/sign-up"
            element={auth ? <Navigate to="/student/home" /> : <StudentSignUp2 />}
          />
          <Route
            path="/student/sign-in"
            element={auth ? <Navigate to="/student/home" /> : <StudentSignIn2 />}
          />

          {/*  private routes */}
          <Route element={auth && role!=="student" ? <PrivateRoutes roleRequiredStudent="student" /> : null}>
            <Route element={<HomeLayout />}>
              <Route path="/student/home" element={<Home />} />
              <Route path="/student/profile" element={<Profile />} />
              <Route path="/student/calendar" element={<Calendar />} />

              <Route path="/student/chat-support" element={<Chat />} />
              <Route path="/student/help" element={<Faq />} />
            </Route>
          </Route>

          {/* admin pages */}
          {/*  public routes */}
          <Route path="/admin/sign-up" element={<AdminSignUp2 />} />
          <Route path="/admin/sign-in" element={<AdminSignIn2 />} />

          {/*  private routes */}
          <Route element={auth && role!=="admin" ?<PrivateRoutesAdmin roleRequiredAdmin="admin" /> : null}>
            <Route element={<DashboardLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/add-post" element={<AddPost />} />
              <Route path="/admin/add-event" element={<AddEvent />} />
              <Route path="/admin/inventory" element={<Inventory />} />
              <Route path="/admin/inventory-books" element={<Books />} />
              <Route path="/admin/inventory-uniforms" element={<Uniforms />} />
              <Route path="/admin/inventory-modules" element={<Modules />} />
              <Route path="/admin/students" element={<Students />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
