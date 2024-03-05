import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  MenuItemProps,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  SelectVariants,
} from "@mui/material";

import { SelectableOption } from "@/features/form";

type FilteredSelectProps = {
  variant?: SelectVariants;
} & Omit<MuiSelectProps<string, SelectVariants>, "variant">;

export interface SelectProps extends FilteredSelectProps {
  options: SelectableOption[];
  wrapperProps?: FormControlProps;
  errorMessage?: string;
  placeholderOption?: SelectableOption;
  placeholderOptionProps?: MenuItemProps;
}

export const Select = (props: SelectProps) => {
  const {
    label,
    size,
    options,
    wrapperProps,
    placeholderOption,
    placeholderOptionProps,
    error,
    errorMessage,
    ...rest
  } = props;

  return (
    <FormControl fullWidth error={error} size={size} {...wrapperProps}>
      <InputLabel error={error}>{label}</InputLabel>
      <MuiSelect
        size={size}
        label={label}
        error={error}
        IconComponent={KeyboardArrowDownIcon}
        {...rest}
      >
        {placeholderOption && (
          <MenuItem
            disabled
            value={placeholderOption.value}
            {...placeholderOptionProps}
          >
            <em>{placeholderOption.label}</em>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};
