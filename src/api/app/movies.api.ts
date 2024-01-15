import { SearchTypes } from '../../components/MovieList/IMovieListProps';
import api from '../api.base';
import { ListMovies } from '../interfaces/IMovies';

async function getMovies(
  searchType: SearchTypes,
  page: number
): Promise<ListMovies> {
  const urls: Record<SearchTypes, string> = {
    popular: '/movie/popular',
    top: '/movie/top_rated',
    trending: '/trending/movie/week',
    playing: '/movie/now_playing',
  };

  return api.get(urls[searchType], { language: 'pt-BR', page });
}

async function searchMovies(search: string, page: number): Promise<ListMovies> {
  return api.get('/search/movie', { query: search, page, language: 'pt-BR' });
}

export const MoviesApi = { getMovies, searchMovies };
