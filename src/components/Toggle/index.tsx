import { cva } from 'class-variance-authority';
import { IToggleProps } from './IToggleProps';
import { useEffect, useState } from 'react';

const Toggle: React.FC<IToggleProps> = ({ options, onChange, selected }) => {
  const [optionSelected, setOptionSelected] = useState(selected);
  const [selectedButtonWidth, setSelectedButtonWidth] = useState(0);
  const [selectedButtonLeft, setSelectedButtonLeft] = useState(0);

  useEffect(() => {
    setOptionSelected(selected);

    saveSelectedButtonWidthAndLeft(selected);
  }, [selected]);

  const textVariants = cva([], {
    variants: {
      variants: {
        unselected: ['text-dark-blue'],
        selected: [
          'bg-clip-text',
          'bg-gradient-to-r',
          'from-green',
          'to-light-green',
          'text-transparent',
        ],
      },
      defaultVariants: {
        variant: 'unselected',
      },
    },
  });

  const getSelectedButton = (selectedValue: string): HTMLButtonElement => {
    return document.querySelector(
      `#toggle-${selectedValue}`
    ) as HTMLButtonElement;
  };

  const saveSelectedButtonWidthAndLeft = (selectedValue: string) => {
    const button = getSelectedButton(selectedValue);

    setSelectedButtonWidth(button.offsetWidth);
    setSelectedButtonLeft(button.offsetLeft);
  };

  const change = (value: string) => {
    setOptionSelected(value);
    saveSelectedButtonWidthAndLeft(value);
  };

  return (
    <div className={'relative flex rounded-full border border-dark-blue w-fit'}>
      {options.map(option => (
        <button
          id={`toggle-${option.value}`}
          key={option.value}
          className="px-4 h-7 text-sm font-bold rounded-full z-10"
          onClick={() => change(option.value)}>
          <span
            style={{
              WebkitBackgroundClip:
                option.value === optionSelected ? 'text' : '',
            }}
            className={textVariants({
              variants:
                option.value === optionSelected ? 'selected' : 'unselected',
            })}>
            {option.label}
          </span>
        </button>
      ))}

      <div
        className="transition-left duration-300 ease-in-out absolute h-7 bg-dark-blue rounded-full"
        style={{ width: selectedButtonWidth, left: selectedButtonLeft }}
      />
    </div>
  );
};

export default Toggle;
