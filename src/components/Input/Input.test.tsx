import { render, fireEvent } from '@testing-library/react';
import Input from './';
import '@testing-library/jest-dom';
const mockButtonOnClick = jest.fn();

const defaultProps = {
  value: '',
  placeholder: 'Enter text',
  onChange: jest.fn(),
  button: {
    label: 'Submit',
    onClick: mockButtonOnClick,
  },
};

test('renders Input component with button', () => {
  const { getByPlaceholderText, getByText } = render(
    <Input {...defaultProps} />
  );

  expect(getByPlaceholderText('Enter text')).toBeInTheDocument();
  expect(getByText('Submit')).toBeInTheDocument();
});

test('calls onChange callback when input value changes', () => {
  const { getByPlaceholderText } = render(<Input {...defaultProps} />);

  fireEvent.change(getByPlaceholderText('Enter text'), {
    target: { value: 'New value' },
  });

  expect(defaultProps.onChange).toHaveBeenCalledWith('New value');
});

test('calls button onClick callback when button is clicked', () => {
  const { getByText } = render(<Input {...defaultProps} />);

  fireEvent.click(getByText('Submit'));

  expect(mockButtonOnClick).toHaveBeenCalled();
});
