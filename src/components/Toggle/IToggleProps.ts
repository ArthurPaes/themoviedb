interface ToggleOption<Values> {
  label: string;
  value: Values;
}

export interface IToggleProps<Values> {
  options: ToggleOption<Values>[];
  onChange: (value: Values) => void;
  selected: Values | undefined;
}
