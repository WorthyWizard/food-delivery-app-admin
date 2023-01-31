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

type PickedAutocompleteProps = Omit<
  AutocompleteProps<SelectableOption, false, false, false>,
  "renderInput" | "multiple"
>;

interface Props<TFormValues extends FieldValues = FieldValues>
  extends HookFormFieldProps<TFormValues>,
    PickedAutocompleteProps {
  inputLabel?: string;
}

export const FormAutocomplete = <
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
    value: SelectableOption | null,
    reason: AutocompleteChangeReason
  ) => {
    onChange && onChange(event, value, reason);
    onFieldChange(value);
  };

  return (
    <Autocomplete
      disablePortal
      defaultValue={{ label: "", value: "" }}
      options={options}
      sx={{ width: "100%", maxWidth: "800px" }}
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
          label={inputLabel}
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
