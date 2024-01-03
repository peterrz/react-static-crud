import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from './index';
import { Provider } from 'react-redux';
import store from '../../app/store';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LoginForm Component', () => {
  it('should render the login form correctly', () => {
    render(<Provider store={store}><LoginForm /></Provider>);

    // Check if the form elements are rendered
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should show error messages for empty fields on login button click', async () => {
    render(<Provider store={store}><LoginForm /></Provider>);

    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    // Check if error messages are displayed for empty fields
    expect(screen.getByText(/please enter a username/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a password/i)).toBeInTheDocument();
  });

});
