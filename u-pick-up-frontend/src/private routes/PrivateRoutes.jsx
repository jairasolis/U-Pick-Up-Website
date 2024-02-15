import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from './../auth/useAuth';

const PrivateRoutes = ({ roleRequiredStudent }) => {
  const { auth, role } = useAuth();

  if (auth && role === roleRequiredStudent) {
    return <Outlet />;
    if (role === "admin") {
      return <Navigate to="/student/home" />;
    }
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoutes;
