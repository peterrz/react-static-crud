import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataGridComponent from './DataGridComponent';

// Mock the props
const mockProps = {
  rows: [],
  rowModesModel: {},
  handleRowModesModelChange: jest.fn(),
  handleRowEditStop: jest.fn(),
  processRowUpdate: jest.fn(),
  setRows: jest.fn(),
  setRowModesModel: jest.fn(),
  handleEditClick: jest.fn(),
  handleDeleteClick: jest.fn(),
  handleSaveClick: jest.fn(),
  handleCancelClick: jest.fn(),
  loading: false,
};

test('renders DataGridComponent with Add button', () => {
  render(<DataGridComponent {...mockProps} />);

  // Check if the "Add" button is rendered
  const addButton = screen.getByRole('button', { name: /add/i });
  expect(addButton).toBeInTheDocument();

  // Simulate a click on the "Add" button
  userEvent.click(addButton);

  // Check if the setRows function is called when the button is clicked
  expect(mockProps.setRows).toHaveBeenCalled();
});
