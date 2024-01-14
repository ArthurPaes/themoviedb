import { useState, useEffect } from 'react';
import { ListMovies } from '../../api/interfaces/IMovies';
import Button from '../Button';
import MovieCard from '../MovieCard';
import { Link } from 'react-router-dom';
import { MoviesApi } from '../../api/app/movies.api';
import Toggle from '../Toggle';
import { IToggleProps } from '../Toggle/IToggleProps';
import { getFullImageUrl } from '../../utils/utilFunctions';

const MovieList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<ListMovies>();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    setLoading(true);
    MoviesApi.getMovies()
      .then(result => setMovies(result as ListMovies))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  const toggleOptions: IToggleProps['options'] = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top', value: 'top' },
    { label: 'Nos cinemas', value: 'now-playing' },
    { label: 'Em breve', value: 'upcoming' },
  ];

  return (
    <div>
      <Toggle options={toggleOptions} onChange={() => {}} selected="popular" />
      <div
        className="mt-4 flex flex-row max-[1180px]:gap-x-[20px] gap-x-[60px] gap-y-[40px] w-full
          flex-wrap justify-between">
        {movies?.results.map(movie => (
          <Link key={movie.id} to={`filmes/${movie.id}`}>
            <MovieCard
              date={movie.release_date}
              title={movie.title}
              percentage={Number((movie.vote_average * 10).toFixed())}
              thumbnailUrl={getFullImageUrl(movie.poster_path)}
            />
          </Link>
        ))}
      </div>
      <div className="mt-8 mb-[100px]">
        <Button
          className="w-full"
          label="Carregar Mais"
          textSize={'lg'}
          rounded={'sm'}
          variant={'primary'}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default MovieList;
