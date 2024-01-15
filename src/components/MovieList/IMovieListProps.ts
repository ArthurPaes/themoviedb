export type SearchTypes = 'popular' | 'top' | 'trending' | 'playing';

export interface SearchParams {
  searchType?: SearchTypes;
  search: string;
}

export interface IMovieListProps {
  searchParams?: SearchParams;
}
