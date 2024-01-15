import { render } from '@testing-library/react';
import LoadingSpinner from '.';
import '@testing-library/jest-dom';
test('renders LoadingSpinner component', () => {
  const { container } = render(<LoadingSpinner />);

  expect(container.querySelector('svg')).toBeInTheDocument();
  expect(container.querySelector('circle')).toBeInTheDocument();
  expect(container.querySelector('path')).toBeInTheDocument();
});
