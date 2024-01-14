type toggleValue = string;

interface ToggleOption {
  label: string;
  value: toggleValue;
}

export interface IToggleProps {
  options: ToggleOption[];
  onChange: (value: toggleValue) => void;
  selected: toggleValue;
}
