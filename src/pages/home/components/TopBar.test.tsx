import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopBar from './TopBar';

// Mock the react-router-dom module
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: jest.fn(), // Mocking useNavigate with a mock function
  };
});

// Mock the useAuth module
jest.mock('../../../hook/useAuth', () => ({
  __esModule: true,
  default: () => ({
    isAuthenticated: true,
    logout: jest.fn(),
  }),
}));

test('renders TopBar component', () => {
  render(<TopBar />);
  // Check if the component renders with the correct text
  expect(screen.getByText('Home')).toBeInTheDocument();
});

test('renders logout button', () => {
  render(<TopBar />);

  // Check if the logout button is rendered
  const logoutButton = screen.getByTestId('exit-to-app-icon');
  expect(logoutButton).toBeInTheDocument();
});
