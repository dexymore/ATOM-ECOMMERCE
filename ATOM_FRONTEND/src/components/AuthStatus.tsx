import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../customHooks/useAuth';

const AuthStatus: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAuth();
  const location = useLocation();

  if (isAuthenticated === undefined) {
    return null; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthStatus;
