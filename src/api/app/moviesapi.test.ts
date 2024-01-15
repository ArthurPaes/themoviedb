import api from '../api.base';
import { IMovies, ListMovies } from '../interfaces/IMovies';
import { MoviesApi } from './movies.api';

jest.mock('axios');

describe('MoviesApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const getMoviesMockResponse: IMovies = {
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 0,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0,
  };

  const searchMoviesMockResponse: ListMovies = {
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: [],
  };

  it('should call the MoviesApi.getMovies correctly', async () => {
    jest.spyOn(api, 'get').mockResolvedValueOnce(getMoviesMockResponse);

    const response = await MoviesApi.getMovies('trending', 1);

    expect(api.get).toHaveBeenCalledWith('/trending/movie/week', {
      language: 'pt-BR',
      page: 1,
    });
    expect(response).toBe(getMoviesMockResponse);
  });

  it('should call the MoviesApi.searchMovies correctly', async () => {
    jest.spyOn(api, 'get').mockResolvedValueOnce(searchMoviesMockResponse);

    const response = await MoviesApi.searchMovies('any-query', 1);

    expect(api.get).toHaveBeenCalledWith('/search/movie', {
      language: 'pt-BR',
      query: 'any-query',
      page: 1,
    });
    expect(response).toBe(searchMoviesMockResponse);
  });
});
