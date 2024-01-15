import MovieList from '../../components/MovieList';
import Input from '../../components/Input';
import { useEffect, useState } from 'react';
import { IToggleProps } from '../../components/Toggle/IToggleProps';
import Toggle from '../../components/Toggle';
import {
  SearchParams,
  SearchTypes,
} from '../../components/MovieList/IMovieListProps';
import { useSearchParams } from 'react-router-dom';
import { MoviesApi } from '../../api/app/movies.api';
import { IMovies } from '../../api/interfaces/IMovies';
import { getFullImageUrl } from '../../utils/utilFunctions';

const getRandomEntryFromArray = (movieArray: IMovies[]) => {
  if (movieArray.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * movieArray.length);
  return movieArray[randomIndex];
};

const HomePage: React.FC = () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const querySearch = searchParam.get('search');
  const querySearchType = searchParam.get('searchType');

  const [search, setSearch] = useState('');
  const [toggleSelected, setToggleSelected] = useState<
    SearchTypes | undefined
  >();
  const [listParams, setListParams] = useState<SearchParams>({
    search,
    searchType: toggleSelected as SearchTypes,
  });

  const [currentMovieBackdrop, setCurrentMovieBackdrop] = useState<
    string | undefined
  >();

  const toggleOptions: IToggleProps<SearchTypes>['options'] = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top', value: 'top' },
    { label: 'Trending', value: 'trending' },
    { label: 'Nos cinemas', value: 'playing' },
  ];

  const getBannerBackdrop = async () => {
    const movieList = await MoviesApi.getMovies('playing', 1);
    const randomMovie = getRandomEntryFromArray(movieList.results);
    setCurrentMovieBackdrop(randomMovie?.backdrop_path);
  };

  const onToggleChange = (value: SearchTypes): void => {
    setSearchParams({ searchType: value });
  };

  const onSearchChange = (): void => {
    setSearchParams({ search });
  };
  useEffect(() => {
    if (querySearch) {
      setToggleSelected(undefined);
      setSearch(querySearch || '');
    } else if (querySearchType) {
      setSearch('');
      setToggleSelected(querySearchType as SearchTypes);
    } else {
      setSearchParams({ searchType: 'popular' });
    }

    setListParams({
      search: querySearch || '',
      searchType: querySearchType as SearchTypes,
    });
  }, [querySearch, querySearchType]);

  useEffect(() => {
    getBannerBackdrop();
  }, []);

  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col w-[1300px]">
        {/* Backdrop Banner */}
        <div
          style={{
            backgroundImage: `url(${getFullImageUrl(currentMovieBackdrop)})`,
          }}
          className={`absolute top-0 bg-cover mt-[64px] h-[360px] w-[1300px] -z-30`}>
          <div
            className="flex justify-center items-center w-full h-full bg-gradient-to-r from-[#00567A]
              to-[#00567A] opacity-60"></div>
        </div>
        <div
          data-testid="home-page"
          className={`flex flex-col justify-center text-white bg-cover text-[3em] px-[40px] py-[40px]
            h-[360px]`}>
          <span className="font-bold">Bem-Vindo(a)</span>
          <span className="text-[30px] mb-10">
            Milhões de Filmes, Séries e Pessoas para Descobrir. Explore já.
          </span>

          <Input
            value={search}
            placeholder="Procurar por filmes"
            onChange={value => setSearch(value)}
            button={{
              label: 'Buscar',
              onClick: onSearchChange,
            }}
          />
        </div>
        <div className="mt-8">
          <Toggle
            options={toggleOptions}
            onChange={onToggleChange}
            selected={toggleSelected}
          />
          <MovieList searchParams={listParams} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
