import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if isAuthenticated is stored in local storage
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;
