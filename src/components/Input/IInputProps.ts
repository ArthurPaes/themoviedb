import { IButtonProps } from '../Button/IButtonProps';

type ButtonProps = Pick<IButtonProps, 'label' | 'onClick'>;

export interface IInputProps {
  value: string;
  placeholder: string;
  button?: ButtonProps;
  onChange?: (value: string) => void;
}
