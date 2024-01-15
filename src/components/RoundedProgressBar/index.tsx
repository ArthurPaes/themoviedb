import { useEffect, useState } from 'react';
import { IRoundedProgresBarProps } from './IRoundedProgressBarProps';

export const setProgressColors = (
  percentage: number | null | undefined
): {
  color: string;
  backgroundColor: string;
} => {
  let newColor, newBackgroundColor;

  if (percentage === null || percentage === undefined) {
    newColor = '#d4d4d4';
    newBackgroundColor = '#666666';
  } else if (percentage <= 33) {
    newColor = '#db2360';
    newBackgroundColor = '#571435';
  } else if (percentage <= 66) {
    newColor = '#d2d531';
    newBackgroundColor = '#423d0f';
  } else {
    newColor = '#21d07a';
    newBackgroundColor = '#204529';
  }

  return { color: newColor, backgroundColor: newBackgroundColor };
};

const RoundedProgressBar: React.FC<IRoundedProgresBarProps> = ({
  percentage,
  size,
}) => {
  const [color, setColor] = useState('light-gray');
  const [backgroundColor, setBackgroundColor] = useState('gray');

  const sizeVariants = {
    sm: 'w-[38px] h-[38px] text-[11px]',
    lg: 'w-[60px] h-[60px] text-1xl',
  };

  const updateProgressColors = (): void => {
    const { color: newColor, backgroundColor: newBackgroundColor } =
      setProgressColors(percentage);
    setColor(newColor);
    setBackgroundColor(newBackgroundColor);
  };

  useEffect(() => {
    updateProgressColors();
  }, [percentage]);

  return (
    <div
      className={`flex justify-center items-center rounded-full border-2 border-black transition-transform transform hover:scale-125 ${sizeVariants[size]}`}
      style={{
        background: `
      radial-gradient(closest-side, black 85%, transparent 86% 100%),
      conic-gradient(${color} ${percentage ?? 0}%, ${backgroundColor} 0)
    `,
      }}>
      <span className="font-bold text-white">
        {percentage || percentage === 0 ? percentage + '%' : 'N/A'}
      </span>
    </div>
  );
};

export default RoundedProgressBar;
