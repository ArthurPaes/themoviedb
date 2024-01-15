import React, { ChangeEvent, useRef } from 'react';
import { IInputProps } from './IInputProps';
import Button from '../Button';

const Input: React.FC<IInputProps> = ({
  value,
  placeholder,
  onChange,
  button,
}) => {
  const valueRef = useRef<string>('');

  const onValueChanges = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;
    valueRef.current = value;
    onChange?.(value);
  };

  const buttonClick = (): void => {
    button?.onClick();
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') {
      buttonClick();
    }
  };

  return (
    <div className="flex relative w-full">
      <input
        onKeyDown={handleKeyPress}
        value={value}
        onChange={onValueChanges}
        className="px-6 w-full h-12 text-base rounded-full outline-none text-gray"
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
