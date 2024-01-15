import api from '../api.base';
import {
  IMovieCreditsResponse,
  IMovieDetailsResponse,
} from '../interfaces/IMovieDetails';

import { MovieDetailsApi } from './movieDetails.api';

jest.mock('axios');

describe('MovieDetailsApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const getMovieDetailsMockResponse: IMovieDetailsResponse = {
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

  const getMovieCastResponse: IMovieCreditsResponse = {
    id: '',
    cast: [],
    crew: [],
  };

  it('should call the MovieDetailsApi.getMovieDetails correctly', async () => {
    jest.spyOn(api, 'get').mockResolvedValueOnce(getMovieDetailsMockResponse);

    const response = await MovieDetailsApi.getMovieDetails('any-movie-id');

    expect(api.get).toHaveBeenCalledWith('/movie/any-movie-id?language=pt-BR');
    expect(response).toBe(getMovieDetailsMockResponse);
  });

  it('should call the MovieDetailsApi.getMovieCast correctly', async () => {
    jest.spyOn(api, 'get').mockResolvedValueOnce(getMovieCastResponse);

    const response = await MovieDetailsApi.getMovieCast('any-movie-id');

    expect(api.get).toHaveBeenCalledWith(
      '/movie/any-movie-id/credits?language=pt-BR'
    );
    expect(response).toBe(getMovieCastResponse);
  });
});
