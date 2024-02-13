import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from './auth/useAuth';

const PrivateRoutesAdmin = ({ roleRequired }) => {
  const { auth, role } = useAuth();

  if (auth) {
    if (role === roleRequired) {
      return <Outlet />;
    } else {
      return <Navigate to="/admin/dashboard" />;
    }
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoutesAdmin;
