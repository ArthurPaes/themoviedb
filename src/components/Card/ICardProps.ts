import { ReactNode } from 'react';

export interface ICardProps {
  size: 'md' | 'sm' | null | undefined;
  className: string;
  imgUrl?: string;
  children?: ReactNode;
  onClick?: () => void;
}
