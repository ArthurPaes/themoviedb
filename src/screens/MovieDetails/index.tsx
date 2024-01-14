import { useEffect, useState } from 'react';
import RoundedProgressBar from '../../components/RoundedProgressBar';
import { MovieDetailsApi } from '../../api/app/movieDetails.api';
import CastSlider from '../../components/CastSlider';
import { useParams } from 'react-router-dom';
import {
  ICast,
  ICrew,
  IMovieDetailsResponse,
} from '../../api/interfaces/IMovieDetails';
import {
  convertMinutesToHoursAndMinutes,
  formatDate,
  getFullImageUrl,
} from '../../utils/utilFunctions';
import moment from 'moment';

const MovieDetails: React.FC = () => {
  const params = useParams<{ id: string }>();

  const [movieDetails, setMovieDetails] = useState<IMovieDetailsResponse>();
  const [movieCast, setMovieCast] = useState<ICast[]>();
  const [movieCrew, setMovieCrew] = useState<ICrew[]>();

  const getMovieInfo = async (movieId: string) => {
    const movieInfoResponse = await MovieDetailsApi.getMovieDetails(movieId);
    setMovieDetails(movieInfoResponse);
  };

  const getCrewInfo = async (movieId: string) => {
    const castInfoResponse = await MovieDetailsApi.getMovieCast(movieId);
    const firstSixCrewEntries = castInfoResponse.crew
      .slice(0, 6)
      .sort((a, b) => b.popularity - a.popularity);
    setMovieCast(castInfoResponse.cast);
    setMovieCrew(firstSixCrewEntries);
  };

  const formattedGenreNames = () => {
    const genres = movieDetails?.genres.map(genre => genre.name);
    return genres?.join(', ');
  };

  const onInitialize = () => {
    if (params && params.id) {
      getMovieInfo(params.id);
      getCrewInfo(params.id);
    }
  };

  useEffect(() => {
    onInitialize();
  }, []);

  const bulletPoint = '\u2022';

  return (
    <div>
      {!movieDetails ? (
        <div>Loading</div>
      ) : (
        <>
          {/* Banner and Card */}
          <div className="flex relative flex-row justify-center w-full min-h-[570px]">
            <div className="flex flex-row py-[40px] w-[1300px] z-50">
              <img
                className="w-[300px] h-[450px] rounded-lg bg-cover"
                src={getFullImageUrl(movieDetails.poster_path)}
                alt=""
              />
              <div className="flex flex-col gap-y-[12px] text-white px-[40px] font-bold">
                <p className="text-[40px] font-bold">
                  {movieDetails.title}
                  <span className="font-light opacity-80 ml-[8px]">
                    ({moment(movieDetails.release_date).format('YYYY')})
                  </span>
                </p>
                <div className="flex flex-row items-center gap-x-[10px]">
                  <p>{formatDate(movieDetails.release_date)}</p>
                  <p className="text-white opacity-100">
                    {bulletPoint} {formattedGenreNames()}
                  </p>
                  <p>
                    {bulletPoint}
                    {convertMinutesToHoursAndMinutes(movieDetails.runtime)}
                  </p>
                </div>
                <div className="flex items-center flex-row gap-x-[10px]">
                  <RoundedProgressBar
                    size="lg"
                    percentage={Math.ceil(movieDetails.vote_average * 10)}
                  />
                  <p className="">Avaliação dos usuários</p>
                </div>
                <p className="italic opacity-75">{movieDetails.tagline}</p>
                <p>Sinopse</p>
                <p className="text-[14px] font-normal">
                  {movieDetails.overview}
                </p>
                <div className="flex flex-row flex-wrap gap-x-[200px] gap-y-[30px]">
                  {movieCrew?.map(person => (
                    <div key={person.id} className="w-[150px]">
                      <p className="font-black">{person.name}</p>
                      <p className="font-thin">{person.job}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              style={{
                backgroundImage: `url(${getFullImageUrl(
                  movieDetails.backdrop_path
                )})`,
              }}
              className={`absolute top-0 w-full h-full bg-cover`}>
              <div
                className="flex justify-center items-center w-full h-full bg-gradient-to-r from-[#0C0C1D]
                  to-[black] opacity-80"></div>
            </div>
          </div>
          {/* Cast slider */}
          <div className="flex justify-center my-[40px] bg-white">
            <div className="w-[1300px]">
              <p className="text-[1.4rem] font-semibold">Elenco</p>
              <CastSlider movieCast={movieCast} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
