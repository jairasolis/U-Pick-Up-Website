import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from './auth/useAuth';

const PrivateRoutesAdmin = () => {
  const { auth, role } = useAuth();

  const isAdmin = role === 'admin';

  if (auth) {
    if (isAdmin) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoutesAdmin;
