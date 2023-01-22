import { useCallback } from "react";
import {
  Box,
  Chip,
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  Skeleton,
} from "@mui/material";
import { FieldValues, useController } from "react-hook-form";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { HookFormFieldProps, SelectableOption } from "../types";
import { useFormState } from "../context/FormStateContext";

type OmittedSelectProps = Omit<SelectProps<string | string[]>, "error">;

interface Props<TFormValues extends FieldValues = FieldValues>
  extends OmittedSelectProps,
    HookFormFieldProps<TFormValues> {
  options: SelectableOption[];
  wrapperProps?: FormControlProps;
  onSelectChange?: () => void;
}

const FormSelect = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const {
    config,
    onSelectChange,
    options,
    multiple,
    wrapperProps,
    disabled,
    label,
    ...rest
  } = props;

  const { isLoading } = useFormState() || {};

  const { field, fieldState } = useController(config);

  const { error } = fieldState;
  const { ref, onChange: onFormFieldChange, ...fieldRest } = field;

  const changeHandler = (event: SelectChangeEvent<string | string[]>) => {
    onFormFieldChange(event.target.value);
    if (onSelectChange) {
      onSelectChange();
    }
  };

  const renderValue = useCallback(
    (selected: string | string[]) => (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {Array.isArray(selected)
          ? selected.map((value) => (
              <Chip key={value} label={options[Number(value)].label} />
            ))
          : selected}
      </Box>
    ),
    []
  );

  return (
    <FormControl
      fullWidth
      disabled={isLoading || disabled}
      sx={{ maxWidth: "800px" }}
      error={Boolean(error?.message)}
      {...wrapperProps}
    >
      <InputLabel error={Boolean(error?.message)}>{label}</InputLabel>
      <Select
        label={label}
        onChange={changeHandler}
        multiple={multiple}
        inputRef={ref}
        error={Boolean(error?.message)}
        IconComponent={KeyboardArrowDownIcon}
        {...(multiple && {
          renderValue,
        })}
        {...fieldRest}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {Boolean(error?.message) && (
        <FormHelperText error>{error?.message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormSelect;
