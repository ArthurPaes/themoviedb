import React, { ChangeEvent, useRef } from 'react';
import { IInputProps } from './IInputProps';
import Button from '../Button';

const Input: React.FC<IInputProps> = ({ placeholder, onChange, button }) => {
  const valueRef = useRef<string>('');

  const onValueChanges = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    valueRef.current = value;
    onChange?.(value);
  };

  const buttonClick = () => {
    button?.onClick();
  };

  return (
    <div className="relative w-full flex">
      <input
        onChange={onValueChanges}
        className="w-full text-gray px-6 h-12 text-base rounded-full outline-none"
        placeholder={placeholder}
      />

      {button && (
        <Button
          textSize="md"
          size="md"
          rounded="full"
          className="absolute right-0"
          variant={'primary'}
          label={button.label}
          onClick={buttonClick}
        />
      )}
    </div>
  );
};

export default Input;
