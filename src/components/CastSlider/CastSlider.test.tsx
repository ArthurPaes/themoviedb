import { render, screen } from '@testing-library/react';
import { ICast } from '../../api/interfaces/IMovieDetails';
import CastSlider from '.';
import { getFullImageUrl } from '../../utils/utilFunctions';
import '@testing-library/jest-dom';

const mockMovieCast: ICast[] = [
  {
    adult: false,
    gender: 2,
    id: 1,
    known_for_department: 'Acting',
    name: 'Actor 1',
    popularity: 10,
    profile_path: '/actor1.jpg',
    cast_id: 1,
    character: 'Character 1',
    credit_id: 'abc123',
    order: 1,
  },
  {
    adult: false,
    gender: 2,
    id: 2,
    known_for_department: 'Acting',
    name: 'Actor 2',
    popularity: 15,
    profile_path: '/actor2.jpg',
    cast_id: 2,
    character: 'Character 2',
    credit_id: 'def456',
    order: 2,
  },
];

jest.mock('../../utils/utilFunctions', () => ({
  getFullImageUrl: jest.fn(path => path),
}));

test('renders CastSlider component with cast cards', () => {
  render(<CastSlider movieCast={mockMovieCast} />);

  expect(screen.queryByTestId('not-found')).toBeNull();

  expect(screen.getByText('Actor 1')).toBeInTheDocument();
  expect(screen.getByText('Character 1')).toBeInTheDocument();
  expect(screen.getByText('Actor 2')).toBeInTheDocument();
  expect(screen.getByText('Character 2')).toBeInTheDocument();

  expect(getFullImageUrl).toHaveBeenCalledWith('/actor1.jpg');
  expect(getFullImageUrl).toHaveBeenCalledWith('/actor2.jpg');
});

test('renders CastSlider copmonent with message if theres no cast', () => {
  render(<CastSlider movieCast={[]} />);

  expect(screen.queryByTestId('not-found')).toBeInTheDocument();
});
