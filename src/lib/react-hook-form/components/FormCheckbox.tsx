import { ChangeEvent } from "react";
import { FieldValues, useController } from "react-hook-form";
import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
} from "@mui/material";

import { ControlledFormFieldProps } from "../types";

interface Props<TFormValues extends FieldValues = FieldValues>
  extends CheckboxProps,
    ControlledFormFieldProps<TFormValues> {
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
    onFieldChange(event);

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
          {...rest}
          {...fieldRest}
          checked={value}
          onChange={changeHandler}
        />
      }
    />
  );
};
