import { useEffect, useRef, useState } from 'react';
import { IMovies, ListMovies } from '../../api/interfaces/IMovies';
import Button from '../Button';
import MovieCard from '../MovieCard';
import { Link } from 'react-router-dom';
import { MoviesApi } from '../../api/app/movies.api';
import { IMovieListProps } from './IMovieListProps';
import { formatDate, getFullImageUrl } from '../../utils/utilFunctions';
import { useToast } from '../../hooks/useToast';
import LoadingSpinner from '../LoadingSpinner';

const MovieList: React.FC<IMovieListProps> = ({ searchParams }) => {
  const pageRef = useRef<number>(1);
  const { showToast } = useToast();
  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<IMovies[]>([]);

  useEffect(() => {
    if (searchParams?.search || searchParams?.searchType) {
      pageRef.current = 1;
      fetchMovies(1);
    }
  }, [searchParams]);

  const getSearchMethod = (page: number): Promise<ListMovies> => {
    if (searchParams?.searchType) {
      return MoviesApi.getMovies(searchParams.searchType, page);
    } else {
      return MoviesApi.searchMovies(
        searchParams?.search || '',
        pageRef.current
      );
    }
  };

  const fetchMovies = async (
    page: number,
    isChangingPage?: boolean
  ): Promise<void> => {
    setLoading(true);
    try {
      const moviesList = await getSearchMethod(page);
      const reachedMaxPage = page >= moviesList.total_pages;
      setDisableButton(reachedMaxPage);
      setMovies(movies =>
        isChangingPage ? [...movies, ...moviesList.results] : moviesList.results
      );
    } catch (error: any) {
      showToast('Não foi possível buscar os filmes', error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = (): void => {
    pageRef.current = pageRef.current + 1;
    fetchMovies(pageRef.current, true);
  };

  const noMoviesFound = !loading && movies.length === 0;

  return (
    <>
      <div
        style={{
          columnGap: 'calc((100% - 895px) / 4',
        }}
        className="mt-4 grid grid-cols-5 gap-y-[40px] w-full flex-wrap">
        {movies?.map(movie => (
          <Link className="w-fit" key={movie.id} to={`filmes/${movie.id}`}>
            <MovieCard
              date={formatDate(movie.release_date)}
              title={movie.title}
              percentage={Number((movie.vote_average * 10).toFixed())}
              thumbnailUrl={getFullImageUrl(movie.poster_path)}
            />
          </Link>
        ))}
      </div>
      {loading && (
        <div className="mt-8 w-full h-8">
          <LoadingSpinner />
        </div>
      )}
      {noMoviesFound ? (
        <p className="mb-20">
          Nenhum filme encontrado com os filtros selecionados!
        </p>
      ) : (
        <div className="mt-8 mb-[100px]">
          <Button
            className="w-full"
            label="Carregar Mais"
            textSize={'lg'}
            rounded={'sm'}
            variant={'primary'}
            disabled={disableButton}
            onClick={loadMore}
          />
        </div>
      )}
    </>
  );
};

export default MovieList;
