export interface IMovieCardProps {
  percentage?: number;
  thumbnailUrl: string;
  title: string;
  date: string;
  className?: string;
  onClick?: () => void;
}
