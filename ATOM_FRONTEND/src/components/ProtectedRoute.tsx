import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { verifyUser } from '../utils/API'; // Adjust path as needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyUser(); 
        console.log('verifyUser response:', response); 
        setIsAuthenticated(response); // Set the state based on the response
      } catch (error) {
        console.error("Failed to verify user:", error);
        setIsAuthenticated(false); 
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center w-full h-[600px]">
        <FontAwesomeIcon
          icon={faCircleNotch}
          className="text-black h-12 w-12 animate-spin"
        />
      </div>
    );
  }

 
  if (!isAuthenticated) {
    console.log('Redirecting to /auth');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }


  console.log('Rendering protected content');
  return <>{children}</>;
};

export default ProtectedRoute;
