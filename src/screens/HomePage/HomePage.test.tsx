import { render, fireEvent, waitFor } from '@testing-library/react';
import HomePage from './';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { MoviesApi } from '../../api/app/movies.api';
import { ListMovies } from '../../api/interfaces/IMovies';

describe('HomePage component', () => {
  const moviesListMock: ListMovies = {
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: [],
  };

  beforeAll(() => {
    jest.spyOn(MoviesApi, 'getMovies').mockResolvedValueOnce(moviesListMock);
  });

  const history = createBrowserHistory();
  history.push = jest.fn();
  test('renders correctly', async () => {
    const { getByTestId } = render(
      <Router location={history.location} navigator={history}>
        <HomePage />
      </Router>
    );
    await waitFor(() => {
      const homePageElement = getByTestId('home-page');
      expect(homePageElement).toBeInTheDocument();
    });
  });

  test('updates search state on input change', () => {
    const { getByPlaceholderText } = render(
      <Router location={history.location} navigator={history}>
        <HomePage />
      </Router>
    );
    const searchInput = getByPlaceholderText('Procurar por filmes');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Avengers' } });
    });

    expect((searchInput as any).value).toBe('Avengers');
  });
});
