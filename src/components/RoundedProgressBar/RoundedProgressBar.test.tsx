import React from 'react';
import { render, screen } from '@testing-library/react';
import RoundedProgressBar, { setProgressColors } from '.';
import '@testing-library/jest-dom';

describe('RoundedProgressBar', () => {
  test('renders correctly with percentage', () => {
    render(<RoundedProgressBar percentage={50} size="sm" />);

    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  test('renders "N/A" when percentage is null or undefined', () => {
    render(<RoundedProgressBar size="lg" />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});

describe('setProgressColors', () => {
  test('returns correct colors for percentage <= 33', () => {
    const result = setProgressColors(30);
    expect(result).toEqual({
      color: '#db2360',
      backgroundColor: '#571435',
    });
  });

  test('returns correct colors for percentage <= 66', () => {
    const result = setProgressColors(60);
    expect(result).toEqual({
      color: '#d2d531',
      backgroundColor: '#423d0f',
    });
  });

  test('returns default colors for null or undefined percentage', () => {
    const result = setProgressColors(null);
    expect(result).toEqual({
      color: '#d4d4d4',
      backgroundColor: '#666666',
    });
  });
});
