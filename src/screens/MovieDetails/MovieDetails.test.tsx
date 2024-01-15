import { act, render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import MovieDetails, { formattedGenreNames } from './';
import { MovieDetailsApi } from '../../api/app/movieDetails.api';
import {
  IMovieCreditsResponse,
  IMovieDetailsResponse,
} from '../../api/interfaces/IMovieDetails';
import '@testing-library/jest-dom';
import { createBrowserHistory } from 'history';
import CastSlider from '../../components/CastSlider';

jest.mock('../../api/app/movieDetails.api', () => ({
  MovieDetailsApi: {
    getMovieDetails: jest.fn(),
    getMovieCast: jest.fn(),
  },
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    id: 1,
  }),
}));

jest.mock('../../components/CastSlider', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

describe('MovieDetails Component', () => {
  const mockDetails: IMovieDetailsResponse = {
    adult: false,
    backdrop_path: '',
    belongs_to_collection: [],
    budget: 0,
    genres: [],
    homepage: '',
    id: '',
    imdb_id: '',
    original_languange: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    production_companies: [],
    production_countries: [],
    release_date: '',
    revenue: '',
    runtime: 0,
    spoken_languages: [],
    status: '',
    tagline: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 467,
  };

  const movieCreditsMock: IMovieCreditsResponse = {
    id: '',
    cast: [],
    crew: [],
  };

  const history = createBrowserHistory();
  history.push = jest.fn();

  const renderComponent = () =>
    render(
      <Router location={''} navigator={history}>
        <MovieDetails />
      </Router>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading spinner while fetching data', async () => {
    jest
      .spyOn(MovieDetailsApi, 'getMovieDetails')
      .mockResolvedValueOnce(mockDetails);

    const { getByTestId } = renderComponent();

    await waitFor(() => {
      expect(getByTestId('loading-div')).toBeInTheDocument();
    });
  });

  it('renders movie details when data is fetched', async () => {
    jest
      .spyOn(MovieDetailsApi, 'getMovieDetails')
      .mockResolvedValueOnce(mockDetails);

    const { getByTestId } = renderComponent();

    await waitFor(() => {
      expect(getByTestId('movieDetails-container')).toBeInTheDocument();
    });
  });

  it('invokes functions on initialization', async () => {
    jest
      .spyOn(MovieDetailsApi, 'getMovieDetails')
      .mockResolvedValueOnce(mockDetails);

    act(() => {
      renderComponent();
    });

    await waitFor(() => {
      expect(MovieDetailsApi.getMovieDetails).toHaveBeenCalled();
      expect(MovieDetailsApi.getMovieCast).toHaveBeenCalled();
    });
  });

  it('renders cast slider with correct props', async () => {
    jest
      .spyOn(MovieDetailsApi, 'getMovieCast')
      .mockResolvedValueOnce(movieCreditsMock);
    jest
      .spyOn(MovieDetailsApi, 'getMovieDetails')
      .mockResolvedValueOnce(mockDetails);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Elenco/i)).toBeInTheDocument();
      expect(CastSlider).toHaveBeenCalledWith(
        { movieCast: movieCreditsMock.cast },
        expect.anything()
      );
    });
  });
});

describe('formattedGenreNames Function', () => {
  it('returns empty string for empty genre list', () => {
    const result = formattedGenreNames([]);
    expect(result).toBe('');
  });

  it('returns a formatted string for a list of genres', () => {
    const genres = [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Adventure' },
      { id: 3, name: 'Sci-Fi' },
    ];

    const result = formattedGenreNames(genres);
    expect(result).toBe('Action, Adventure, Sci-Fi');
  });
});
