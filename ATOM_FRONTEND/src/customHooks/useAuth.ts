import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../utils/API';
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyUser();
  
        setIsAuthenticated(response); 
      } catch {
        setIsAuthenticated(false);
      }
    };
// 
    checkAuth();
  }, [navigate]);

  return isAuthenticated;
};

export default useAuth;
