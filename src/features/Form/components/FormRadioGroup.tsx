import { ChangeEventHandler } from "react";
import {
  FormControl,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Skeleton,
} from "@mui/material";
import { FieldValues, useController } from "react-hook-form";
import { HookFormFieldProps, SelectableOption } from "../types";
import { StyledFormControlLabel } from "../styled";
import { useFormState } from "../context/FormStateContext";

interface Props<TFormValues extends FieldValues = FieldValues>
  extends RadioGroupProps,
    HookFormFieldProps<TFormValues> {
  options: SelectableOption[];
  inputLabel?: string;
  radioGroupProps?: RadioGroupProps;
  onRadioGroupChange?: () => void;
}

const FormRadioGroup = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { options, config, radioGroupProps, onRadioGroupChange, ...rest } =
    props;

  const { isLoading } = useFormState() || {};

  const { field } = useController(config);

  const { onChange, ...fieldRest } = field;

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
    if (onRadioGroupChange) {
      onRadioGroupChange();
    }
  };

  return (
    <FormControl disabled={isLoading}>
      <RadioGroup
        {...radioGroupProps}
        {...rest}
        {...fieldRest}
        onChange={changeHandler}
      >
        {options.map(({ label, value }) => (
          <StyledFormControlLabel
            key={value}
            label={label}
            labelPlacement="start"
            control={<Radio value={value} />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default FormRadioGroup;
