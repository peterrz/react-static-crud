import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Avatar } from '@mui/material';
import Link from '@mui/material/Link';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchUserCredentials } from '../../store/authSlice';
import { useNavigate } from "react-router-dom";
import useAuth from '../../hook/useAuth';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const { login: authLogin } = useAuth();

  const handleLogin = () => {
    try {
      if (!username || !password) {
        // Set error state for empty fields
        setUsernameError(!username);
        setPasswordError(!password);
        return;
      }
      // Dispatch the fetchUserCredentials thunk to compare credentials
      dispatch(fetchUserCredentials({ username, password, authLogin, navigate }));

    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/peterrz">
          My Github
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Container component="main" maxWidth="xs"  >
        <div className="flex items-center justify-center">
          <Avatar sx={{ width: 56, height: 56, m: 2, bgcolor: '#01579b' }}>
            <LockOpenIcon />
          </Avatar>
        </div>
        <div>
          <Typography variant="h5">Sign In page</Typography>
          <form>
            <TextField
              label="Username"
              margin="normal"
              required
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError} // <-- Add error prop
              helperText={usernameError ? 'Please enter a username' : ''}
            />
            <TextField
              label="Password"
              type="password"
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError} // <-- Add error prop
              helperText={passwordError ? 'Please enter a password' : ''}
            />
            <Button variant="contained" size='large' fullWidth onClick={handleLogin} disabled={loading}>
              Login
            </Button>
          </form>
        </div>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </div>
  );
};

export default LoginForm;
