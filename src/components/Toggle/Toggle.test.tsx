import { render, fireEvent } from '@testing-library/react';
import Toggle from '.';
import '@testing-library/jest-dom';

interface MockOption {
  value: string;
  label: string;
}

const options: MockOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

const mockProps = {
  options,
  onChange: jest.fn(),
  selected: 'option1',
};

describe('Toggle Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Toggle {...mockProps} />);

    options.forEach(option => {
      const optionElement = getByText(option.label);
      expect(optionElement).toBeInTheDocument();
    });

    const selectedOption = getByText('Option 1');
    expect(selectedOption).toHaveClass(
      'bg-gradient-to-r',
      'from-green',
      'to-light-green',
      'text-transparent'
    );

    const unselectedOption = getByText('Option 2');
    expect(unselectedOption).toHaveClass('text-dark-blue');
  });

  it('changes the selected option on click', () => {
    const { getByText } = render(<Toggle {...mockProps} />);

    const option2 = getByText('Option 2');
    fireEvent.click(option2);

    expect(mockProps.onChange).toHaveBeenCalledWith('option2');
  });

  it('updates the selected option when prop changes', () => {
    const { getByText, rerender } = render(<Toggle {...mockProps} />);

    const selectedOption1 = getByText('Option 1');
    expect(selectedOption1).toHaveClass(
      'bg-gradient-to-r',
      'from-green',
      'to-light-green',
      'text-transparent'
    );

    mockProps.selected = 'option2';
    rerender(<Toggle {...mockProps} />);

    const selectedOption2 = getByText('Option 2');
    expect(selectedOption2).toHaveClass(
      'bg-gradient-to-r',
      'from-green',
      'to-light-green',
      'text-transparent'
    );
  });
});
