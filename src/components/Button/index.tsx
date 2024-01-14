import React from 'react';
import { IButtonProps } from './IButtonProps';
import { cva } from 'class-variance-authority';

const Button: React.FC<IButtonProps> = ({
  onClick,
  label,
  className,
  variant,
  Icon,
  disabled,
  rounded,
  size,
  textSize,
}) => {
  const variants = cva(
    [
      'tracking-wide',
      'gap-x-3',
      'py-[10px]',
      'px-[20px]',
      'flex',
      'flex-row',
      'justify-center',
      'items-center',
    ],
    {
      variants: {
        variant: {
          primary: [
            'text-white',
            'hover:text-black',
            'bg-gradient-to-r from-[#1DD7B2] to-[#01B4E4]',
          ],
          secondary: [
            'text-black',
            'bg-transparent',
            'outline',
            'outline-black',
          ],
        },
        size: {
          sm: ['h-[32px]'],
          md: ['h-[48px]'],
          lg: ['h-[64px]'],
        },
        rounded: {
          sm: ['rounded-[8px]'],
          md: ['rounded-[16px]'],
          lg: ['rounded-[32px]'],
          full: ['rounded-full'],
        },
        textSize: {
          sm: ['text-[12px]'],
          md: ['text-[16px]'],
          lg: ['text-[24px]'],
        },
        disabled: {
          true: ['opacity-50'],
        },
      },
      defaultVariants: {
        variant: 'primary',
        disabled: false,
        size: 'md',
        rounded: 'md',
      },
    }
  );

  return (
    <button
      className={variants({
        variant,
        className,
        disabled,
        size,
        textSize,
        rounded,
      })}
      onClick={onClick}
      disabled={disabled}>
      <span className="font-bold">{label}</span>
      {Icon}
    </button>
  );
};

export default Button;
