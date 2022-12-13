import { ChangeEventHandler } from "react";
import { Checkbox, CheckboxProps } from "@mui/material";
import { FieldValues, useController } from "react-hook-form";
import { HookFormFieldProps } from "../types";
import { StyledFormControlLabel } from "../styled";

interface Props<TFormValues extends FieldValues = FieldValues>
  extends CheckboxProps,
    HookFormFieldProps<TFormValues> {
  label: string;
  onCheckboxChange?: () => void;
}

const FormCheckbox = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { controllerConfig, label, onCheckboxChange, ...rest } = props;

  const { field } = useController(controllerConfig);
  const { ref, value, onChange, ...fieldRest } = field;

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.checked);
    if (onCheckboxChange) {
      onCheckboxChange();
    }
  };

  return (
    <StyledFormControlLabel
      inputRef={ref}
      label={label}
      labelPlacement="start"
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

export default FormCheckbox;
