import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = ({ path, element }) => {
  const authToken = localStorage.getItem('authToken');
  const auth = { authToken: !!authToken };

  return (
    auth.authToken ? <Outlet /> : <Navigate to="/" />
  );
};

export default PrivateRoutes;
