import { render, fireEvent } from '@testing-library/react';
import Card from '.';
import { ICardProps } from './ICardProps';
import '@testing-library/jest-dom';

const mockCardProps: ICardProps = {
  className: 'custom-class',
  size: 'md',
  imgUrl: '/image.jpg',
  onClick: jest.fn(),
};

test('renders Card component with correct props', () => {
  const { getByAltText, getByText } = render(
    <Card {...mockCardProps}>Card Content</Card>
  );

  const cardElement = getByText('Card Content').parentElement;
  expect(cardElement).toHaveClass('custom-class');
  expect(cardElement).toHaveClass('min-w-[181px]');
  expect(cardElement).toHaveClass('w-[181px]');
  expect(cardElement).toHaveClass('h-[376px]');

  expect(getByAltText('')).toBeInTheDocument(); // Add the correct alt text based on your requirements
  expect(getByText('Card Content')).toBeInTheDocument();
});

test('calls onClick callback when the card is clicked', () => {
  const { getByTestId } = render(<Card {...mockCardProps}>Card Content</Card>);

  fireEvent.click(getByTestId('card-element'));

  expect(mockCardProps.onClick).toHaveBeenCalled();
});
