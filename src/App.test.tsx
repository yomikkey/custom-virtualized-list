import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Virtualized List/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Add new Button', () => {
  render(<App />);
  const AddNewBtn = screen.getByText(/Add new/i);
  expect(AddNewBtn).toBeInTheDocument();
});