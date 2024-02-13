import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from './auth/useAuth';

const PrivateRoutes = ({ roleRequired }) => {
  const { auth, role } = useAuth();

  if (auth) {
    if (role === roleRequired) {
      return <Outlet />;
    } else {
      return <Navigate to="/student/home" />;
    }
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoutes;
