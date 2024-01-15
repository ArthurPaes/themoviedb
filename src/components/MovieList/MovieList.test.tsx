import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MovieList from './';
import { MoviesApi } from '../../api/app/movies.api';
import { ListMovies } from '../../api/interfaces/IMovies';
import '@testing-library/jest-dom';

jest.mock('../../api/app/movies.api');
jest.mock('../../hooks/useToast', () => ({
  useToast: jest.fn().mockReturnValue({ showToast: jest.fn() }),
}));

const mockSearchMoviesList: ListMovies = {
  page: 1,
  total_pages: 2,
  total_results: 4,
  results: [
    {
      adult: false,
      backdrop_path: '/backdrop1.jpg',
      genre_ids: [1, 2],
      id: 1,
      original_language: 'en',
      original_title: 'Movie 1',
      overview: 'Overview 1',
      popularity: 7.5,
      poster_path: '/poster1.jpg',
      release_date: '2024-01-14',
      title: 'Movie 1',
      video: false,
      vote_average: 7.5,
      vote_count: 100,
    },
    {
      adult: false,
      backdrop_path: '/backdrop2.jpg',
      genre_ids: [3, 4],
      id: 2,
      original_language: 'en',
      original_title: 'Movie 2',
      overview: 'Overview 2',
      popularity: 8.0,
      poster_path: '/poster2.jpg',
      release_date: '2024-01-15',
      title: 'Movie 2',
      video: false,
      vote_average: 8.0,
      vote_count: 120,
    },
  ],
};

describe('MovieList component', () => {
  beforeEach(() => {
    jest.spyOn(MoviesApi, 'getMovies').mockResolvedValue(mockSearchMoviesList);
    jest
      .spyOn(MoviesApi, 'searchMovies')
      .mockResolvedValue(mockSearchMoviesList);
  });

  test('renders MovieList component with movies', async () => {
    render(
      <Router>
        <MovieList searchParams={{ searchType: 'popular', search: '' }} />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });

    expect(screen.getByText('Carregar Mais')).toBeInTheDocument();
  });

  test('loads more movies when "Carregar Mais" button is clicked', async () => {
    render(
      <Router>
        <MovieList searchParams={{ searchType: 'popular', search: '' }} />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Carregar Mais'));

    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
      expect(screen.getByText('Carregar Mais')).toBeInTheDocument();
    });

    expect(MoviesApi.getMovies).toHaveBeenCalledWith('popular', 2);
  });
});
