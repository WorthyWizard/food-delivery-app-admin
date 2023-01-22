import { ChangeEventHandler } from "react";
import { Checkbox, CheckboxProps } from "@mui/material";
import { FieldValues, useController } from "react-hook-form";
import { HookFormFieldProps } from "../types";
import { StyledFormControlLabel } from "../styled";
import { useFormState } from "../context/FormStateContext";

interface Props<TFormValues extends FieldValues = FieldValues>
  extends CheckboxProps,
    HookFormFieldProps<TFormValues> {
  label: string;
  onCheckboxChange?: () => void;
}

const FormCheckbox = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { config, label, onCheckboxChange, disabled, ...rest } = props;

  const { isLoading } = useFormState() || {};

  const { field } = useController(config);
  const { ref, value, onChange, ...fieldRest } = field;

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.checked);
    if (onCheckboxChange) {
      onCheckboxChange();
    }
  };

  return (
    <StyledFormControlLabel
      disabled={isLoading || disabled}
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
