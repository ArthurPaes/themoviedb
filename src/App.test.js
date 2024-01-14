import React from 'react'
import { render, screen } from '@testing-library/react';
import App from './App';

test('home-page should be defined', () => {
  render(<App />);
  const home = screen.getAllByTestId('home-page');
  expect(home).toBeDefined();
});
