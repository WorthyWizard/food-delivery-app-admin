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
} from "@mui/material";
import { ReactNode, useCallback } from "react";
import { FieldValues, useController } from "react-hook-form";
import { HookFormFieldProps, SelectableOption } from "../types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type OmittedSelectProps = Omit<SelectProps<string | string[]>, "error">;

interface Props<TFormValues extends FieldValues = FieldValues>
  extends OmittedSelectProps,
    HookFormFieldProps<TFormValues> {
  options: SelectableOption[];
  wrapperProps?: FormControlProps;
}

export const FormSelect = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { config, onChange, label, options, multiple, wrapperProps, ...rest } =
    props;

  const { field, fieldState } = useController(config);

  const { error } = fieldState;
  const { ref, onChange: onFieldChange, ...fieldRest } = field;

  const changeHandler = (
    event: SelectChangeEvent<string | string[]>,
    child: ReactNode
  ) => {
    onFieldChange(event.target.value);

    onChange && onChange(event, child);
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
      sx={{ maxWidth: "800px" }}
      fullWidth
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
