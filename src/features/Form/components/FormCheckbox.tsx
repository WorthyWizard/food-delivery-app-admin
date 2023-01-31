import { ChangeEvent } from "react";
import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
} from "@mui/material";
import { FieldValues, useController } from "react-hook-form";
import { HookFormFieldProps } from "../types";

interface Props<TFormValues extends FieldValues = FieldValues>
  extends CheckboxProps,
    HookFormFieldProps<TFormValues> {
  label: string;
  wrapperProps?: Partial<FormControlLabelProps>;
}

export const FormCheckbox = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { config, label, onChange, wrapperProps, ...rest } = props;

  const { field } = useController(config);
  const { ref, value, onChange: onFieldChange, ...fieldRest } = field;

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    onFieldChange(checked);

    onChange && onChange(event, checked);
  };

  return (
    <FormControlLabel
      inputRef={ref}
      label={label}
      labelPlacement="start"
      {...wrapperProps}
      control={
        <Checkbox
          checked={value}
          onChange={changeHandler}
          {...rest}
          {...fieldRest}
        />
      }
    />
  );
};
