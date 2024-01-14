import api from '../api.base';
import {
  IMovieCreditsResponse,
  IMovieDetailsResponse,
} from '../interfaces/IMovieDetails';

async function getMovieDetails(
  movieId: string
): Promise<IMovieDetailsResponse> {
  return api.get(`/movie/${movieId}?language=pt-BR`);
}

async function getMovieCast(movieId: string): Promise<IMovieCreditsResponse> {
  return api.get(`/movie/${movieId}/credits?language=pt-BR`);
}

export const MovieDetailsApi = { getMovieDetails, getMovieCast };
