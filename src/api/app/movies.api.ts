import api from '../api.base';
import { ListMovies } from '../interfaces/IMovies';

async function getMovies(): Promise<ListMovies> {
  return api.get('/movie/popular');
}

export const MoviesApi = { getMovies };
