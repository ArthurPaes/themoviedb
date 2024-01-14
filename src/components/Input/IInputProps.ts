import { IButtonProps } from '../Button/IButtonProps';

type ButtonProps = Pick<IButtonProps, 'label' | 'onClick'>;

export interface IInputProps {
  placeholder: string;
  button?: ButtonProps;
  onChange?: (value: string) => void;
}
