import { ReactElement } from 'react';

export interface IPButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
  variant: 'primary' | 'secondary' | null | undefined;
  Icon?: ReactElement;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg' | null | undefined;
  textSize?: 'sm' | 'md' | 'lg' | null | undefined;
  rounded?: 'sm' | 'md' | 'lg' | 'full' | null | undefined;
}
