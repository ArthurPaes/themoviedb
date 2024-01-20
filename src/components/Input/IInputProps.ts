import { IPButtonProps } from '../Button/IPButtonProps';

type ButtonProps = Pick<IPButtonProps, 'label' | 'onClick'>;

export interface IPInputProps {
  value: string;
  placeholder: string;
  button?: ButtonProps;
  onChange?: (value: string) => void;
}
