import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/errorHandler';
import './App.css';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import { Toaster } from 'react-hot-toast';
import useAuth from './hook/useAuth';

function App() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path="/login" element={
          <LoginPage />
        } />
        <Route path="/home" element={<HomePage />
        } />
        <Route path="*" element={<Navigate to="/home" replace />
        } />
      </Routes>
      <Toaster />
    </ErrorBoundary>
  );
}

export default App;
