import { cva } from 'class-variance-authority';
import { ICardProps } from './ICardProps';

const Card: React.FC<ICardProps> = ({
  className,
  size,
  imgUrl,
  children,
  onClick,
}) => {
  const variants = cva(
    [
      'shadow-lg',
      'relative',
      'bg-white',
      'rounded-[8px]',
      'border-[1px]',
      'border-[#e3e3e3]',
    ],
    {
      variants: {
        size: {
          sm: 'min-w-[140px] w-[140px] h-[280px]',
          md: 'min-w-[181px] w-[181px] h-[376px]',
        },
      },
      defaultVariants: {
        size: 'md',
      },
    }
  );

  return (
    <>
      <div
        data-testid="card-element"
        onClick={() => {
          onClick && onClick();
        }}
        className={variants({ className, size })}>
        <img
          className="rounded-t-[8px] h-[70%] w-full object-cover"
          src={imgUrl}
          alt=""
          loading="lazy"
        />
        <div
          style={{
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
          className="w-full h-[28%] px-[10px] py-[20px] text-[14px]">
          {children}
        </div>
      </div>
    </>
  );
};

export default Card;
