import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { fetchData, deleteItem, updateItem, createItem, sortData } from '../../store/dataGridSlice'; // Adjust this import based on your file structure

import HomePage from './index';

// Mock the Redux store and any other dependencies if necessary
jest.mock('../../app/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));
// Mock the react-router-dom module
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: jest.fn(), // Mocking useNavigate with a mock function
  };
});
jest.mock('../../store/dataGridSlice', () => ({
  fetchData: jest.fn(),
  deleteItem: jest.fn(),
  updateItem: jest.fn(),
  createItem: jest.fn(),
  sortData: jest.fn(),
}));

describe('HomePage Component', () => {
  beforeEach(() => {
    // Mock the Redux store state
    (useAppSelector as jest.Mock).mockReturnValue({
      data: [{ id: 1, name: 'John', age: 25, city: 'New York' }],
      index: 1,
      loading: false,
    });
    // Mock the dispatch function
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  test('renders HomePage component', () => {
    render(<HomePage />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByTestId('data-grid-component')).toBeInTheDocument();
  });

});
