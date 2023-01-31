import { TimePicker, TimePickerProps } from "@mui/x-date-pickers";
import { FieldValues, useController } from "react-hook-form";
import { HookFormFieldProps } from "../types";
import { StyledTextField } from "../styled";

type OmittedTimePickerProps = Omit<
  TimePickerProps<Date, Date>,
  "renderInput" | "value" | "onChange" | "inputRef"
>;

interface Props<TFormValues extends FieldValues = FieldValues>
  extends OmittedTimePickerProps,
    HookFormFieldProps<TFormValues> {
  onChange?: (
    value: Date | null,
    keyboardInputValue?: string | undefined
  ) => void;
}

export const FormTimeInput = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { config, onChange, ...rest } = props;

  const { field, fieldState } = useController(config);
  const { ref, onChange: onFieldChange, ...fieldRest } = field;
  const { error } = fieldState;

  const changeHandler = (
    value: Date | null,
    keyboardInputValue?: string | undefined
  ) => {
    onFieldChange(value);
    onChange && onChange(value, keyboardInputValue);
  };

  return (
    <TimePicker
      {...rest}
      {...fieldRest}
      inputRef={ref}
      onChange={changeHandler}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          error={Boolean(error?.message)}
          helperText={error?.message}
        />
      )}
    />
  );
};
