// PrivateRoutes.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from './../auth/useAuth';

const PrivateRoutesAdmin = ({ roleRequiredAdmin }) => {
  const { auth, role } = useAuth();

  if (auth && role === roleRequiredAdmin) {
    return <Outlet />;
    if (role === "student") {
      return <Navigate to="/admin/dashboard" />;
    }
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoutesAdmin;
