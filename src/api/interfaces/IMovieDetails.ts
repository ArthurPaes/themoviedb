export interface IMovieDetailsResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: IBelongsToCollection[];
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: string;
  imdb_id: string;
  original_languange: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompanies[];
  production_countries: IProductionCountries[];
  release_date: string;
  revenue: string;
  runtime: number;
  spoken_languages: ISpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: 467;
}

export interface IGenre {
  id: number;
  name: string;
}

interface IBelongsToCollection {
  backdrop_path: string;
  id: string;
  name: string;
  poster_path: string;
}

interface IProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface IProductionCountries {
  iso_3166_1: string;
  name: string;
}

interface ISpokenLanguages {
  english_name: string;
  iso_639: string;
  name: string;
}

export interface IMovieCreditsResponse {
  id: string;
  cast: ICast[];
  crew: ICrew[];
}

export interface ICast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export type ICrew = Omit<ICast, 'cast_id' | 'character' | 'order'> & {
  job: string;
  department: string;
  original_name: string;
};
