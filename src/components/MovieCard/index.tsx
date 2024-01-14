import Card from '../Card';
import RoundedProgressBar from '../RoundedProgressBar';
import { IMovieCardProps } from './IMovieCardProps';

const MovieCard: React.FC<IMovieCardProps> = ({
  percentage,
  date,
  className,
  thumbnailUrl,
  title,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      className={className ?? ''}
      size={'md'}
      imgUrl={thumbnailUrl}>
      <div className="absolute bottom-[90px] left-[15px]">
        <RoundedProgressBar percentage={percentage} size="sm" />
      </div>
      <p className="font-bold cursor-pointer hover:text-sky-400">{title}</p>
      <p className="text-gray"> {date} </p>
    </Card>
  );
};

export default MovieCard;
