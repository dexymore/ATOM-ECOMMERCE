import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../utils/API'; // Adjust path as needed
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyUser();
        console.log(response); // Ensure it's a boolean
        setIsAuthenticated(response); // Directly set the boolean
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return isAuthenticated;
};

export default useAuth;
