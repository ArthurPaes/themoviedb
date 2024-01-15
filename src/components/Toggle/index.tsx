import { cva } from 'class-variance-authority';
import { IToggleProps } from './IToggleProps';
import { useEffect, useState } from 'react';

const Toggle = <Values,>({
  options,
  onChange,
  selected,
}: IToggleProps<Values>) => {
  const [optionSelected, setOptionSelected] = useState(selected);
  const [selectedButtonWidth, setSelectedButtonWidth] = useState(0);
  const [selectedButtonLeft, setSelectedButtonLeft] = useState(0);

  useEffect(() => {
    setOptionSelected(selected);

    if (selected) {
      saveSelectedButtonWidthAndLeft(selected);
    }
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

  const saveSelectedButtonWidthAndLeft = (selectedValue: Values): void => {
    const button = getSelectedButton(selectedValue as string);

    setSelectedButtonWidth(button.offsetWidth);
    setSelectedButtonLeft(button.offsetLeft);
  };

  const change = (value: Values): void => {
    setOptionSelected(value);
    saveSelectedButtonWidthAndLeft(value);
    onChange?.(value);
  };

  return (
    <div className={'flex relative rounded-full border border-dark-blue w-fit'}>
      {options.map(option => (
        <button
          id={`toggle-${option.value}`}
          key={option.value as string}
          className="z-10 px-4 h-7 text-sm font-bold rounded-full"
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

      {selected && (
        <div
          className="absolute h-7 rounded-full duration-300 ease-in-out transition-left bg-dark-blue"
          style={{ width: selectedButtonWidth, left: selectedButtonLeft }}
        />
      )}
    </div>
  );
};

export default Toggle;
