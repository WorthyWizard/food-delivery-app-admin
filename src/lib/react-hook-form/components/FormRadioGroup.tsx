import { ChangeEvent } from "react";
import { FieldValues, useController } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";

import { ControlledFormFieldProps, SelectableOption } from "../types";

interface Props<TFormValues extends FieldValues = FieldValues>
  extends RadioGroupProps,
    ControlledFormFieldProps<TFormValues> {
  options: SelectableOption[];
  label?: string;
  radioGroupProps?: RadioGroupProps;
}

export const FormRadioGroup = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { options, config, radioGroupProps, label, onChange, ...rest } = props;

  const { field } = useController(config);

  const { onChange: onFieldChange, ...fieldRest } = field;

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    onFieldChange(value as any);
    onChange && onChange(event, value);
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        {...radioGroupProps}
        {...rest}
        {...fieldRest}
        onChange={changeHandler}
      >
        {options.map(({ label, value }) => (
          <FormControlLabel
            key={value}
            label={label}
            control={<Radio value={value} />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
