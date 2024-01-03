import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';

test('redirects to home page if  authenticated', () => {
  // Mock isAuthenticated to be false
  jest.mock('./hook/useAuth', () => ({
    __esModule: true,
    default: jest.fn(() => ({ isAuthenticated: true })),
  }));

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route path="/login" element={<div data-testid="login-page" />} />
          <Route path="/home" element={<div data-testid="home-page" />} />
        </Routes>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // Assert that the login page is rendered
  expect(screen.getByTestId('login-page')).toBeInTheDocument();
});

test('redirects to login page if not authenticated', () => {
  // Mock isAuthenticated to be false
  jest.mock('./hook/useAuth', () => ({
    __esModule: true,
    default: jest.fn(() => ({ isAuthenticated: false })),
  }));

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route path="/login" element={<div data-testid="login-page" />} />
          <Route path="/home" element={<div data-testid="home-page" />} />
        </Routes>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // Assert that the login page is rendered
  expect(screen.getByTestId('login-page')).toBeInTheDocument();
});
