import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteProps,
} from "@mui/material";
import { FieldValues, useController } from "react-hook-form";
import { StyledTextField } from "../styled";
import { HookFormFieldProps, SelectableOption } from "../types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SyntheticEvent } from "react";

type OmittedAutocompleteProps = Omit<
  AutocompleteProps<SelectableOption, true, false, false>,
  "renderInput" | "multiple"
>;

interface Props<TFormValues extends FieldValues = FieldValues>
  extends HookFormFieldProps<TFormValues>,
    OmittedAutocompleteProps {
  inputLabel?: string;
}

export const FormMultiAutocomplete = <
  TFieldValues extends FieldValues = FieldValues
>(
  props: Props<TFieldValues>
) => {
  const { inputLabel, options = [], config, onChange, ...rest } = props;

  const { field, fieldState } = useController(config);

  const { error } = fieldState;
  const { onChange: onFieldChange, ref, ...fieldRest } = field;

  const changeHandler = (
    event: SyntheticEvent,
    value: SelectableOption[],
    reason: AutocompleteChangeReason
  ) => {
    onChange && onChange(event, value, reason);
    onFieldChange(value);
  };

  return (
    <Autocomplete
      multiple
      disablePortal
      filterSelectedOptions
      defaultValue={[]}
      options={options}
      sx={{ width: "100%" }}
      onChange={changeHandler}
      getOptionLabel={(option) => option.label ?? ""}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      popupIcon={<KeyboardArrowDownIcon />}
      renderOption={(props, option) => (
        <li {...props} key={option.value}>
          {option.label}
        </li>
      )}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          inputRef={ref}
          label={inputLabel}
          error={Boolean(error?.message)}
          helperText={error?.message}
        />
      )}
      {...rest}
      {...fieldRest}
    />
  );
};
