import { SyntheticEvent } from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteProps,
} from "@mui/material";
import { FieldValues, useController } from "react-hook-form";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { StyledTextField } from "../styled";
import { HookFormFieldProps, SelectableOption } from "../types";
import { useFormState } from "../context/FormStateContext";

type OmittedAutocompleteProps = Omit<
  AutocompleteProps<SelectableOption, false, false, false>,
  "renderInput" | "multiple"
>;

interface Props<TFormValues extends FieldValues = FieldValues>
  extends HookFormFieldProps<TFormValues>,
    OmittedAutocompleteProps {
  label?: string;
}

const FormAutocomplete = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { label, options = [], config, onChange, disabled, ...rest } = props;

  const { isLoading } = useFormState() || {};

  const { field, fieldState } = useController(config);

  const { error } = fieldState;
  const { onChange: onFieldChange, ref, ...fieldRest } = field;

  const changeHandler = (
    event: SyntheticEvent,
    value: SelectableOption | null,
    reason: AutocompleteChangeReason
  ) => {
    onChange && onChange(event, value, reason);
    onFieldChange(value);
  };

  return (
    <Autocomplete
      disablePortal
      disabled={isLoading || disabled}
      defaultValue={{ label: "", value: "" }}
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
          label={label}
          error={Boolean(error)}
          helperText={error?.message}
          inputRef={ref}
        />
      )}
      {...rest}
      {...fieldRest}
    />
  );
};

export default FormAutocomplete;
