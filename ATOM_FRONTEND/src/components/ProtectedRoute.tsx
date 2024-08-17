import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users/verify', { withCredentials: true });
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyUser();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or your custom loading spinner
  }

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
