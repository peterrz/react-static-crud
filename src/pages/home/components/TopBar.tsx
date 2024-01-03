import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import useAuth from '../../../hook/useAuth';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const TopBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" className="bg-blue-500 w-screen">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Home
        </Typography>
        {isAuthenticated && (
          <Button data-testid="exit-to-app-icon" color="inherit" onClick={handleLogout}>
            <ExitToAppIcon />
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;